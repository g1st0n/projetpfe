import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { ProductControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { ProductResponse } from 'src/network/openapi/models/';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TokenService } from 'src/network/openapi/apis/tokenService';


@Component({
  selector: 'app-sorting-table',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    ProductControllerApi
  ],
  templateUrl: './sorting-table.component.html',
  styleUrls: ['./sorting-table.component.scss']
})
export class SortingTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'designation', 'reference', 'price', 'productionDuration'];
  dataSource: MatTableDataSource<ProductResponse>;
  products: ProductResponse[] = [];
  totalItems = 0; // To store the total number of products (for paginator)
  pageSize = 10; // Default page size
  pageIndex = 0; // Default to the first page

  selection = new SelectionModel<ProductResponse>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private tokenService: TokenService,

    public dialog: MatDialog,
    private productService: ProductControllerApi // Inject the product service
  ) { this.dataSource = new MatTableDataSource();}

  // Fetch the data when the component initializes
  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch products with pagination and sorting parameters
  fetchProducts(): void {
    const sortField = this.sort?.active || 'name'; // Default to sorting by 'name'
    const sortDirection = this.sort?.direction || 'asc'; // Default to ascending sort
  
    // Construct the pageable parameters
    const pageable = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: [`${sortField},${sortDirection}`]  // Combine field and direction
    };
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    this.productService.getProducts({ pageable }, { headers })
      .then((response: any) => {
        this.products = response.content; 
        this.totalItems = response.totalElements; 

        this.dataSource = new MatTableDataSource(this.products);

        this.dataSource.paginator = this.paginator;
        
        this.dataSource.sort = this.sort;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        
      });
  }
  

  // Listen to paginator changes
  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.fetchProducts(); // Fetch the data again with new pageIndex and pageSize
    });

    this.sort.sortChange.subscribe(() => {
      this.pageIndex = 0; // Reset page index on sort change
      this.fetchProducts(); // Fetch the data again with new sort settings
    });
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '30vw',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: row,
      panelClass: 'custom-dialog-container'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Product was saved or updated:", result.data);
        this.fetchProducts(); // Refresh the product list after an update or add
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('openAddDialog closed with result:', result); 
      if (result && result.success) {
        console.log("Product was added:", result.data);
        this.fetchProducts(); // Refresh the product list after adding a new product
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
