import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse, SubCategoryResponseDTO } from 'src/network/openapi/models/';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { SousCategorieAddComponent } from 'src/app/dialogPop/panel-sous-produit/add-sous-categorie/sous-categorie-add.component';
import { DialogsouscategorieComponent } from 'src/app/dialogPop/panel-sous-produit/info-sous-categorie/dialogsouscategorie.component';
import { SelectionModel } from '@angular/cdk/collections';
import { SubCategoryControllerApi } from 'src/network/openapi';

export interface subCategory {
  idSubCategory: number;
  name: string;
  reference: string;
}

@Component({
  selector: 'app-table-sous-categorie',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    SubCategoryControllerApi
  ],
  templateUrl: './table-sous-categorie.component.html',
  styleUrl: './table-sous-categorie.component.scss'
})
export class TableSousCategorieComponent {
  displayedColumns: string[] = [ 'reference','Nom'];
  dataSource: MatTableDataSource<SubCategoryResponseDTO>;
  Subcategorie: SubCategoryResponseDTO[] = [];
  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default 

  
  selection = new SelectionModel<SubCategoryResponseDTO>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(  
    public dialog: MatDialog,
  private subService : SubCategoryControllerApi
){
  this.dataSource = new MatTableDataSource();
}
ngOnInit(): void {
  this.fetchSub(); // Fetch the data when the component initializes
}
fetchSub(): void {
  const sortField = this.sort?.active || 'name'; // Default to sorting by 'name'
  const sortDirection = this.sort?.direction || 'asc'; // Default to ascending sort

  // Construct the pageable parameters
  const pageable = {
    page: this.pageIndex,
    size: this.pageSize,
    sort: [`${sortField},${sortDirection}`] 
  };

  // Send pageable object to the OpenAPI-generated getProducts method
  this.subService.getSubCategories({ pageable })
    .then((response: any) => {
      this.Subcategorie = response.content; 
      this.totalItems = response.totalElements; // The total number of products
console.log(response.content)
      // Assign data to the table data source
      this.dataSource = new MatTableDataSource(this.Subcategorie);

      // Set the paginator and sort AFTER the data is set
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

ngAfterViewInit() {
  this.paginator.page.subscribe(() => {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.fetchSub(); // Fetch the data again with new pageIndex and pageSize
  });

  this.sort.sortChange.subscribe(() => {
    this.pageIndex = 0; // Reset page index on sort change
    this.fetchSub(); // Fetch the data again with new sort settings
  });
}
  openAddDialog(): void {
    const dialogRef = this.dialog.open(SousCategorieAddComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Client info was updated:", result.data);
        this.fetchSub(); // Refresh the client list after editing
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

openDialog(row: any): void {
  const dialogRef = this.dialog.open(DialogsouscategorieComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result && result.success) {
      console.log("Client info was updated:", result.data);
      this.fetchSub(); // Refresh the client list after editing
    }
  });
}
}