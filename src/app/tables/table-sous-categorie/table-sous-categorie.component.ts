import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProductResponse } from 'src/network/openapi/models/';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { SousCategorieAddComponent } from 'src/app/dialogPop/panel-sous-produit/add-sous-categorie/sous-categorie-add.component';
import { DialogsouscategorieComponent } from 'src/app/dialogPop/panel-sous-produit/info-sous-categorie/dialogsouscategorie.component';
const SOUS = [

{ reference:"12tx",Nom:"jean",TypeMatiere:"sois" },
]
@Component({
  selector: 'app-table-sous-categorie',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table-sous-categorie.component.html',
  styleUrl: './table-sous-categorie.component.scss'
})
export class TableSousCategorieComponent {
  displayedColumns: string[] = [ 'reference','Nom',  'TypeMatiere'];

  dataSource: MatTableDataSource<any>;

constructor(    public dialog: MatDialog,
){
  this.dataSource = new MatTableDataSource(SOUS);

}
  openAddDialog(): void {
    const dialogRef = this.dialog.open(SousCategorieAddComponent, {
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
  const dialogRef = this.dialog.open(DialogsouscategorieComponent, {
    width: '30vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
}
}