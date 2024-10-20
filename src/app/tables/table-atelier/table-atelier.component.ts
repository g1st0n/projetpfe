import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { AddAtelierComponent } from 'src/app/dialogPop/panel-atelier/add-atelier/add-atelier.component';
import { InfoAtelierComponent } from 'src/app/dialogPop/panel-atelier/info-atelier/info-atelier.component';
import { WorkshopControllerApi, WorkshopRequestDTO } from 'src/network/openapi';
import { SelectionModel } from '@angular/cdk/collections';
import { MatModule } from 'src/app/appModules/mat.module';

export interface ClientData {
  workshopNumber: number;
  productionCapacity: number;
  machineCount: number;
  machineCost: number;
 
}
@Component({
  selector: 'app-table-atelier',
  standalone: true,
  imports: [CommonModule,MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    WorkshopControllerApi
  ],
  templateUrl: './table-atelier.component.html',
  styleUrl: './table-atelier.component.scss'
})
export class TableAtelierComponent {
  displayedColumns: string[] = [ 'NumAtelier','Capacite','NbMachine','CoutMachine'];
  dataSource: MatTableDataSource<WorkshopRequestDTO>;
  selection = new SelectionModel<WorkshopRequestDTO>(true, []);
  WorkShop: WorkshopRequestDTO[] = [];

  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default page index

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(    public dialog: MatDialog,
  private workShopService : WorkshopControllerApi 
){
  this.dataSource = new MatTableDataSource();

}



ngOnInit(): void {
  this.fetchShop(); // Fetch the data when the component initializes
}

toggleSelection(row: any): void {
  this.selection.toggle(row);
}

isAllSelected(): boolean {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle(): void {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}



fetchShop(): void {
  const sortField = this.sort?.active || 'fullName'; // Default sorting field
  const sortDirection = this.sort?.direction || 'asc'; // Default sorting direction

  // Construct the pageable parameters
  const pageable = {
    page: this.pageIndex,
    size: this.pageSize,
    sort: [`${sortField},${sortDirection}`]
  };

  // Fetch clients from the API
  
}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAtelierComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
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
  const dialogRef = this.dialog.open(InfoAtelierComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
}
}
