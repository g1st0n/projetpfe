import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatModule } from 'src/app/appModules/mat.module';

import { SelectionModel } from '@angular/cdk/collections';
import { DialogAddProductComponent } from 'src/app/dialogPop/dialog-add-product/dialog-add-product.component';
import { DialogsouscategorieComponent } from 'src/app/dialogPop/dialogsouscategorie/dialogsouscategorie.component';
import { CommonModule } from '@angular/common';

const SOUS_CATEGORIES = [
  { id: '1', typeMatiere: 'Coton', nom: 'Coton Égyptien', reference: 'COT001' },
  { id: '2', typeMatiere: 'Soie', nom: 'Soie Naturelle', reference: 'SOI002' },
  { id: '3', typeMatiere: 'Lin', nom: 'Lin Premium', reference: 'LIN003' },
  { id: '4', typeMatiere: 'Laine', nom: 'Laine Mérinos', reference: 'LAI004' },
  { id: '5', typeMatiere: 'Polyester', nom: 'Polyester Haute Qualité', reference: 'POL005' },
];

@Component({
  selector: 'app-sous-categorie',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  templateUrl: './sous-categorie.component.html',
  
  styleUrls: ['./sous-categorie.component.scss']
})
export class SousCategorieComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'typeMatiere', 'nom', 'reference'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []); // To handle multi-selection
  deleteMode = false; // Track if we are in delete mode

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    // Initialize with static data
    this.dataSource = new MatTableDataSource(SOUS_CATEGORIES);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Toggle the delete mode to show checkboxes
  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
    if (!this.deleteMode) {
      this.selection.clear(); // Clear selection when leaving delete mode
    }
  }

  // Apply the filter to the table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Toggle selection for a single row
  toggleRow(row: any) {
    this.selection.toggle(row);
  }

  // Check if all rows are selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Toggle all rows
  toggleAllRows(event: any) {
    if (event.checked) {
      this.selection.select(...this.dataSource.data);
    } else {
      this.selection.clear();
    }
  }

  // Check if some rows are selected
  isIndeterminate() {
    return this.selection.hasValue() && !this.isAllSelected();
  }

  // Handle deleting selected rows
  deleteSelectedRows() {
    const selectedRows = this.selection.selected;
    this.dataSource.data = this.dataSource.data.filter(row => !selectedRows.includes(row));
    this.selection.clear(); // Clear selection after deletion
    this.toggleDeleteMode(); // Exit delete mode after deletion
  }

  // Open the Add Product Dialog
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
        // Handle the result from the dialog (e.g., adding a new entry)
        console.log('Form Data:', result);
        // You can push the new result into `dataSource.data` to update the table
      }
    });
  }

  // Open the View Dialog for a row
  openDialog(row: any): void {
    this.dialog.open(DialogsouscategorieComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: row,
      panelClass: 'custom-dialog-container'
    });
  }
}