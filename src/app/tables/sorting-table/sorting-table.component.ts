import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from 'src/app/dialogPop/dialog-component/dialog-component.component';
import { ProductControllerApi } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/apis/';  // Import the API service
import { ProductResponse } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/models/';
import { DialogAddProductComponent } from 'src/app/dialogPop/dialog-add-product/dialog-add-product.component';
import { SelectionModel } from '@angular/cdk/collections';


export interface UserData {
  id: number;
  name: string;
  progress: string;
  fruit: number;
  temps: string ,
 
}

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
    public dialog: MatDialog,
    private productService: ProductControllerApi // Inject the product service
  ) {}

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
    
    console.log(pageable);
    // Send pageable object to the OpenAPI-generated getProducts method
    this.productService.getProducts({ pageable })
      .then((response: any) => {
        this.products = response.content; // Assuming backend returns { content, totalElements }
        this.totalItems = response.totalElements; // The total number of products
  
        // Assign data to the table data source and update paginator and sorter
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
    this.dialog.open(DialogComponentComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: row,
      panelClass: 'custom-dialog-container'
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
      if (result) {
        // Handle the form result here, update the product list if necessary
        this.fetchProducts(); // Optionally refresh the data after adding a product
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
  toggleRow(row: UserData) {
    this.selection.toggle(row);
  }
  toggleAllRows(event: any) {
    if (event.checked) {
      this.selection.select(...this.dataSource.data);
    } else {
      this.selection.clear();
    }
  }
  deleteSelectedRows() {
    const selectedRows = this.selection.selected;
    this.dataSource.data = this.dataSource.data.filter(row => !selectedRows.includes(row));
    this.selection.clear(); // Clear selection after deletion
  }
}
