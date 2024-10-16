import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { AddMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/add-matiere-premiere/add-matiere-premiere.component';
import { InfoMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/info-matiere-premiere/info-matiere-premiere.component';

const COMMANDE = [

  { Nom:"longue robe",TypeMatiere:"sois",PrixUni:"15" ,Origine:"afrique",Couleur:"rouge",
    unite:"metre",QuantiteDispo:"150"
  },
  ]

@Component({
  selector: 'app-table-matiere-premiere',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-matiere-premiere.component.html',
  styleUrl: './table-matiere-premiere.component.scss'
})
export class TableMatierePremiereComponent {
  displayedColumns: string[] = [ 'Nom','TypeMatiere','PrixUni','Origine','Couleur','unite','QuantiteDispo'];

  dataSource: MatTableDataSource<any>;

constructor(    public dialog: MatDialog,
){
  this.dataSource = new MatTableDataSource(COMMANDE);

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


applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
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
}
