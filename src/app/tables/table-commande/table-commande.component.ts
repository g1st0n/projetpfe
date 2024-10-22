import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddProductComponent } from 'src/app/dialogPop/panel-product/add-product/dialog-add-product.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponentComponent } from 'src/app/dialogPop/panel-product/info-product/dialog-component.component';
import { InfoCommandeComponent } from 'src/app/dialogPop/panel-commande/info-commande/info-commande.component';
import { AddCommandeComponent } from 'src/app/dialogPop/panel-commande/add-commande/add-commande.component';
import { TokenService } from '../../../network/openapi/apis/tokenService';
import { OrderResponseDTO } from 'src/network/openapi';
import { OrderControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { SelectionModel } from '@angular/cdk/collections';

const COMMANDE = [

  { Client:"Gpro Consulting",Produit:"jean",DateCommande:"10/6/2024" ,DateLimite:"15/6/2024",Quantite:"15"},
  ]


@Component({
  selector: 'app-table-commande',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    OrderControllerApi
  ],
  templateUrl: './table-commande.component.html',
  styleUrl: './table-commande.component.scss'
})
export class TableCommandeComponent {
  displayedColumns: string[] = ['clientName', 'productName', 'date', 'quantity'];
  orders: OrderResponseDTO[] = [];
  dataSource: MatTableDataSource<OrderResponseDTO>;
  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default page index

  selection = new SelectionModel<OrderResponseDTO>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(    public dialog: MatDialog,
  private orderService: OrderControllerApi,
  private tokenService: TokenService,
){
  this.dataSource = new MatTableDataSource();

}
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCommandeComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.fetchOrders(); // Refresh client list after adding a new client
      }
    });
}

ngOnInit(): void {
  this.fetchOrders(); 
  console.log('Error fetching clients:');
  // Fetch the data when the component initializes
}

ngAfterViewInit() {
  this.paginator.page.subscribe(() => {
    this.pageIndex = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    this.fetchOrders(); // Fetch the data again with the new pagination
  });

  this.sort.sortChange.subscribe(() => {
    this.pageIndex = 0; // Reset page index on sort change
    this.fetchOrders(); // Fetch the data again with the new sort order
  });
}

fetchOrders(): void {
  const sortField = this.sort?.active || 'Client'; // Default sorting field
  const sortDirection = this.sort?.direction || 'asc'; // Default sorting direction

  // Construct the pageable parameters
  const pageable = {
    page: this.pageIndex,
    size: this.pageSize,
    sort: [`${sortField},${sortDirection}`]
  };
  const headers = this.tokenService.getAuthHeaders();
  headers['Content-Type'] = 'application/json';
  
  this.orderService.getOrders({ pageable }, {headers})
    .then((response: any) => {
      if (response && response.content) {
        this.orders = response.content;
        console.log(this.orders);

        // Extract content from the response
        this.totalItems = response.totalElements || 0; // Extract total items
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    .catch(error => {
      console.error('Error fetching clients:', error);
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
  dialogRef.afterClosed().subscribe(result => {
    if (result && result.success) {
      console.log("Order info was updated:", result.data);
      this.fetchOrders(); // Refresh the client list after editing
    }
  });
}
toggleRowSelection(row: OrderResponseDTO): void {
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
      idOrder: row.idOrder,  // Ensure you're passing the correct 'id' field
    };

    // Call the delete method with the correct request object
    this.orderService.deleteOrder(deleteRequest).then(() => {
      this.fetchOrders(); // Refresh the table after deletion
    }).catch(error => {
      console.error('Error deleting sous-categorie:', error);
    });
  });

  this.selection.clear(); // Clear the selection after deletion
}
}
