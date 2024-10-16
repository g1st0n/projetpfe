import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { InfoClientComponent } from 'src/app/dialogPop/panel-client/info-client/info-client.component';
import { AddClientComponent } from 'src/app/dialogPop/panel-client/add-client/add-client.component';
const CLIENT = [

  { TypeClient:"société",Nom:"GPRO consulting",Email:"Gpro.consulting@gmail.com" ,Adresse:"15bilel benrabbeh"},
  ]
@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-client.component.html',
  styleUrl: './table-client.component.scss'
})
export class TableClientComponent {
  displayedColumns: string[] = [ 'TypeClient','Nom','Email','Adresse'];

  dataSource: MatTableDataSource<any>;

constructor(    public dialog: MatDialog,
){
  this.dataSource = new MatTableDataSource(CLIENT);

}
openAddDialog(): void {
  const dialogRef = this.dialog.open(AddClientComponent, {
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
  const dialogRef = this.dialog.open(InfoClientComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
}
}
