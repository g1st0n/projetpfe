import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { InfoCommandeComponent } from 'src/app/dialogPop/panel-commande/info-commande/info-commande.component';
import { AddCommandeComponent } from 'src/app/dialogPop/panel-commande/add-commande/add-commande.component';

const COMMANDE = [

  { Client:"Gpro Consulting",Produit:"jean",DateCommande:"10/6/2024" ,DateLimite:"15/6/2024",Quantite:"15"},
  ]



@Component({
  selector: 'app-table-commande',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-commande.component.html',
  styleUrl: './table-commande.component.scss'
})
export class TableCommandeComponent {
  displayedColumns: string[] = [ 'Client','Produit','DateCommande','DateLimite','Quantite'];

  dataSource: MatTableDataSource<any>;

constructor(    public dialog: MatDialog,
){
  this.dataSource = new MatTableDataSource(COMMANDE);

}
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCommandeComponent, {
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
  const dialogRef = this.dialog.open(InfoCommandeComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
}
}
