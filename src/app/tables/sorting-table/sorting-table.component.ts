import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponentComponent } from 'src/app/dialogPop/dialog-component/dialog-component.component';
import { ProductControllerApi } from 'src/network/openapi/apis/';
import { ProductResponse } from 'src/network/openapi/models/';
import { DialogAddProductComponent } from 'src/app/dialogPop/dialog-add-product/dialog-add-product.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-sorting-table',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [ProductControllerApi],
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
    private productService: ProductControllerApi
  ) {}

  ngOnInit(): void {
    this.fetchProducts(); // Load products when the component initializes
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.fetchProducts(); // Fetch products on page change
    });

    this.sort.sortChange.subscribe(() => {
      this.pageIndex = 0; // Reset page index on sort change
      this.fetchProducts(); // Fetch products on sort change
    });
  }

  // Fetch products with pagination and sorting parameters
  fetchProducts(): void {
    const sortField = this.sort?.active || 'name'; // Default to sorting by 'name'
    const sortDirection = this.sort?.direction || 'asc'; // Default to ascending sort

    // Construct the pageable parameters
    const pageable = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: [`${sortField},${sortDirection}`]
    };

    // Send pageable object to the getProducts method
    this.productService.getProducts({ pageable })
      .then((response: any) => {
        this.products = response.content; // Assuming backend returns { content, totalElements }
        this.totalItems = response.totalElements; // Total number of products

        // Assign data to the table data source
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  // Open dialog to edit product
  openDialog(row: any): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '80vw',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: row,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Product was saved or updated:", result.data);
        this.fetchProducts(); // Fetch products after the dialog is closed and changes have been made
      }
    });
  }

  // Open dialog to add product
  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Product was added:", result.data);
        this.fetchProducts(); // Fetch products after a new product is added
      }
    });
  }

  // Apply filter to search products in the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
