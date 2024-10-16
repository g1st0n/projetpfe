import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { AddAtelierComponent } from 'src/app/dialogPop/panel-atelier/add-atelier/add-atelier.component';
import { InfoAtelierComponent } from 'src/app/dialogPop/panel-atelier/info-atelier/info-atelier.component';
const CLIENT = [

  { NumAtelier:"5",Capacite:"12",NbMachine:"12" ,CoutMachine:"5"},
  ]
@Component({
  selector: 'app-table-atelier',
  standalone: true,
  imports: [CommonModule,MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-atelier.component.html',
  styleUrl: './table-atelier.component.scss'
})
export class TableAtelierComponent {
  displayedColumns: string[] = [ 'NumAtelier','Capacite','NbMachine','CoutMachine'];

  dataSource: MatTableDataSource<any>;

constructor(    public dialog: MatDialog,
){
  this.dataSource = new MatTableDataSource(CLIENT);

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
