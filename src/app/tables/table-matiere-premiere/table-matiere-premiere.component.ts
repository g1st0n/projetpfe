import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { Pageable, ProductResponse, RawMaterialResponseDTO } from 'src/network/openapi/models/';
import { SelectionModel } from '@angular/cdk/collections';
import { AddMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/add-matiere-premiere/add-matiere-premiere.component';
import { InfoMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/info-matiere-premiere/info-matiere-premiere.component';
import { RawMaterialControllerApi } from 'src/network/openapi';



@Component({
  selector: 'app-table-matiere-premiere',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    RawMaterialControllerApi
  ],
  templateUrl: './table-matiere-premiere.component.html',
  styleUrl: './table-matiere-premiere.component.scss'
})
export class TableMatierePremiereComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [ 'Nom','TypeMatiere','PrixUni','Origine','Couleur','unite','QuantiteDispo'];
  dataSource: MatTableDataSource<RawMaterialResponseDTO>;
  rawMaterial: RawMaterialResponseDTO[] = [];
  totalItems = 0; // To store the total number of products (for paginator)
  pageSize = 10; // Default page size
  pageIndex = 0; // Default to the first page

  selection = new SelectionModel<RawMaterialResponseDTO>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor( 
   public dialog: MatDialog,
  private RawMaterialservice: RawMaterialControllerApi //
){
  this.dataSource = new MatTableDataSource();
}
ngOnInit(): void {
  this.fetchRaw();
}
fetchRaw(): void {
  const sortField = this.sort?.active || 'name';  // Default sorting field
  const sortDirection = this.sort?.direction || 'asc';  // Default sorting direction

  const pageable: Pageable = {
      page: this.pageIndex,  // Current page index from the paginator
      size: this.pageSize,   // Page size from the paginator
      sort: [`${sortField},${sortDirection}`]  // Sorting field and direction
  };

  // this.RawMaterialservice.getAllRawMaterials({ pageable })
  //   .then((response: any) => {
        
  //       this.rawMaterial = response;  


  //       this.totalItems = response.totalElements ;

  //       this.dataSource = new MatTableDataSource(this.rawMaterial);
    
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //   })
  //   .catch(error => {
  //       console.error('Error fetching raw materials:', error);
  //   });

}

ngAfterViewInit() {
  this.paginator.page.subscribe(() => {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.fetchRaw(); // Fetch the data again with new pageIndex and pageSize
  });

  this.sort.sortChange.subscribe(() => {
    this.pageIndex = 0; // Reset page index on sort change
    this.fetchRaw(); // Fetch the data again with new sort settings
  });
}
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddMatierePremiereComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });

}


openDialog(row: any): void {
  const dialogRef = this.dialog.open(InfoMatierePremiereComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
}

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;  // Ensure that dataSource.filterPredicate is properly set

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
