import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddResponsableComponent } from 'src/app/dialogPop/panel-Responsable/add-responsable/add-responsable.component';
import { InfoResponsableComponent } from 'src/app/dialogPop/panel-Responsable/info-responsable/info-responsable.component';
import { UserControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { SelectionModel } from '@angular/cdk/collections';
import { TokenService } from 'src/network/openapi/apis/tokenService';
import { UserResponseDTO } from 'src/network/openapi/models/';
import { MatSort, MatSortModule } from '@angular/material/sort';



@Component({
  selector: 'app-table-responsable',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule ],
  providers: [
    UserControllerApi
  ],
  templateUrl: './table-responsable.component.html',
  styleUrl: './table-responsable.component.scss'
})
export class TableResponsableComponent {
  displayedColumns: string[] = [ 'image','Nom','Prenom','Email','tel', 'status'];
  selection = new SelectionModel<UserResponseDTO>(true, []);
  dataSource: MatTableDataSource<UserResponseDTO>;
  users: UserResponseDTO[] = [];
  totalItems = 0; // To store the total number of products (for paginator)
  pageSize = 10; // Default page size
  pageIndex = 0; // Default to the first page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(    public dialog: MatDialog,
  private tokenService: TokenService,
  private userService: UserControllerApi ,
){
  this.dataSource = new MatTableDataSource();
}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddResponsableComponent, {
      width: 'auto', 
      maxWidth: '90vw', 
      height: 'auto',
      maxHeight: '90vh', 
     
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.fetchUsers(); // Refresh client list after adding a new client
      }
    });
}

ngOnInit(): void {
  this.fetchUsers();
}

 // Fetch products with pagination and sorting parameters
 fetchUsers(): void {
  const sortField = this.sort?.active || 'name'; // Default to sorting by 'name'
  const sortDirection = this.sort?.direction || 'asc'; // Default to ascending sort

  // Construct the pageable parameters
  const pageable = {
    page: this.pageIndex,
    size: this.pageSize,
    sort: [`${sortField},${sortDirection}`]  // Combine field and direction
  };
  const headers = this.tokenService.getAuthHeaders();
  headers['Content-Type'] = 'application/json';

  this.userService.getUsers({ pageable }, { headers })
    .then((response: any) => {
      console.log(response);

      this.users = response.content; 
      this.totalItems = response.totalElements; 

      this.dataSource = new MatTableDataSource(this.users);

      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;
      console.log(this.users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      
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
  console.log(row);
  const dialogRef = this.dialog.open(InfoResponsableComponent, {
    width: '70vw',
    maxWidth: '90vw',
    height: 'auto',
    maxHeight: '90vh',
    data: row,
    panelClass: 'custom-dialog-container'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result && result.success) {
      console.log("User info was updated:", result.data);
      this.fetchUsers(); // Refresh the client list after editing
    }
  });
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
      id: row.id,  // Ensure you're passing the correct 'id' field
    };

    // Call the delete method with the correct request object
    this.userService.deleteUser(deleteRequest).then(() => {
      this.fetchUsers(); // Refresh the table after deletion
    }).catch(error => {
      console.error('Error deleting Responsable:', error);
    });
  });

  this.selection.clear(); // Clear the selection after deletion
}
}
