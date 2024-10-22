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
import { WorkshopControllerApi, WorkshopRequestDTO, WorkshopResponseDTO } from 'src/network/openapi';
import { SelectionModel } from '@angular/cdk/collections';
import { MatModule } from 'src/app/appModules/mat.module';
import { TokenService } from 'src/network/openapi/apis/tokenService';

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
  displayedColumns: string[] = [ 'select','NumAtelier','Capacite','NbMachine','CoutMachine'];
  dataSource: MatTableDataSource<WorkshopRequestDTO>;
  selection = new SelectionModel<WorkshopRequestDTO>(true, []);
  WorkShop: WorkshopRequestDTO[] = [];

  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default page index

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(   private tokenService: TokenService,
   public dialog: MatDialog,
  private workShopService : WorkshopControllerApi 
){
  this.dataSource = new MatTableDataSource();

}



ngOnInit(): void {
  this.fetchShop(); // Fetch the data when the component initializes
}

toggleRowSelection(row: WorkshopResponseDTO): void {
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
      idWorkshop: row.idWorkshop,  // Ensure you're passing the correct 'id' field
    };

    // Call the delete method with the correct request object
    this.workShopService.deleteWorkshop(deleteRequest).then(() => {
      this.fetchShop(); // Refresh the table after deletion
    }).catch(error => {
      console.error('Error deleting sous-categorie:', error);
    });
  });

  this.selection.clear(); // Clear the selection after deletion
}



fetchShop(): void {
  const sortField = this.sort?.active || 'name'; // Default sorting field
  const sortDirection = this.sort?.direction || 'asc'; // Default sorting direction

  // Construct the pageable parameters
  const pageable = {
    page: this.pageIndex,
    size: this.pageSize,
    sort: [`${sortField},${sortDirection}`]
  };
  const headers = this.tokenService.getAuthHeaders();
  headers['Content-Type'] = 'application/json';

this.workShopService.getAllWorkshops({ pageable }, { headers })
  .then((response: any) => {
      console.log(response)
      this.WorkShop = response.content;  


      this.totalItems = response.totalElements ;

      this.dataSource = new MatTableDataSource(this.WorkShop);
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
  .catch(error => {
      console.error('Error fetching raw materials:', error);
  });

}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddAtelierComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.fetchShop(); // Refresh client list after adding a new client
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
