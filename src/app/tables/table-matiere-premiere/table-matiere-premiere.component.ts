import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { Pageable, ProductResponse, RawMaterialRequestDTO, RawMaterialResponseDTO } from 'src/network/openapi/models/';
import { SelectionModel } from '@angular/cdk/collections';
import { AddMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/add-matiere-premiere/add-matiere-premiere.component';
import { InfoMatierePremiereComponent } from 'src/app/dialogPop/panel-matiere-premiere/info-matiere-premiere/info-matiere-premiere.component';
import { RawMaterialControllerApi } from 'src/network/openapi';
import { TokenService } from 'src/network/openapi/apis/tokenService';

export interface rawMaterial {
  idMaterial: number;
  name: string;
  materialType: string;
  supplier: string;
  availableQuantity: number;
  unit: string;
  color: string;
  origin: string;
  unitPrice: number;

}


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
  displayedColumns: string[] = [ 'select','Nom','TypeMatiere','PrixUni','Origine','Couleur','unite','QuantiteDispo'];
  dataSource: MatTableDataSource<RawMaterialRequestDTO>;
  RawMaterial: RawMaterialRequestDTO[] = [];
  totalItems = 0; // To store the total number of products (for paginator)
  pageSize = 10; // Default page size
  pageIndex = 0; // Default to the first page

  selection = new SelectionModel<RawMaterialRequestDTO>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(     private tokenService: TokenService,

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
  const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

  this.RawMaterialservice.getAllRawMaterials({ pageable }, { headers })
    .then((response: any) => {
        console.log(response)
        this.RawMaterial = response.content;  


        this.totalItems = response.totalElements ;

        this.dataSource = new MatTableDataSource(this.RawMaterial);
    
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
    .catch(error => {
        console.error('Error fetching raw materials:', error);
    });

}

ngAfterViewInit() {
  this.paginator.page.subscribe(() => {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.fetchRaw(); // Fetch the data again with the new pagination
  });

  this.sort.sortChange.subscribe(() => {
    this.pageIndex = 0; // Reset page index on sort change
    this.fetchRaw(); // Fetch the data again with the new sort order
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
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Client info was updated:", result.data);
        this.fetchRaw(); // Refresh the client list after editing
      }
    });

}


openDialog(row: any): void {
  const dialogRef = this.dialog.open(InfoMatierePremiereComponent, {
    width: '50vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result && result.success) {
      console.log("Client info was updated:", result.data);
      this.fetchRaw(); // Refresh the client list after editing
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
toggleRowSelection(row: RawMaterialRequestDTO): void {
  this.selection.toggle(row);
}

// Master toggle for selecting all rows
masterToggle(): void {
  this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
}

// Check if all rows are selected
isAllSelected(): boolean {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

// Delete selected rows
deleteSelected(): void {
  const selectedRows = this.selection.selected;
  if (selectedRows.length === 0) {
    return;
  }

  selectedRows.forEach(row => {
    // Create the DeleteSubCategoryRequest object for deletion
    const deleteRequest = {
      idMaterial: row.idMaterial,  // Ensure you're passing the correct 'id' field
    };

    // Call the delete method with the correct request object
    this.RawMaterialservice.deleteRawMaterial(deleteRequest).then(() => {
      this.fetchRaw(); // Refresh the table after deletion
    }).catch(error => {
      console.error('Error deleting sous-categorie:', error);
    });
  });

  this.selection.clear(); // Clear the selection after deletion
}
}
