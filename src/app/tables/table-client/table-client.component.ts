import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { InfoClientComponent } from 'src/app/dialogPop/panel-client/info-client/info-client.component';
import { AddClientComponent } from 'src/app/dialogPop/panel-client/add-client/add-client.component';
import { ClientControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { SelectionModel } from '@angular/cdk/collections';
import { TokenService } from '../../../network/openapi/apis/tokenService';
import { ClientResponseDTO } from '../../../network/openapi/models/ClientResponseDTO';


export interface ClientData {
  idClient: number;
  clientType: string;
  fullName: string;
  email: string;
  address: string;
  telephone: number;
}

@Component({
  selector: 'app-table-client',
  standalone: true,
  imports: [CommonModule, MatModule, MatSortModule, MatPaginatorModule],
  providers: [
    ClientControllerApi
  ],
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['clientType', 'fullName', 'email', 'address', 'telephone'];
  dataSource: MatTableDataSource<ClientResponseDTO>;
  clients: ClientResponseDTO[] = [];
  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default page index

  selection = new SelectionModel<ClientResponseDTO>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private clientService: ClientControllerApi,
    private tokenService: TokenService,
  ) {
    this.dataSource = new MatTableDataSource(); // Initial data
     // Inject the product service
  }

  ngOnInit(): void {
    this.fetchClients(); // Fetch the data when the component initializes
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
      this.fetchClients(); // Fetch the data again with the new pagination
    });

    this.sort.sortChange.subscribe(() => {
      this.pageIndex = 0; // Reset page index on sort change
      this.fetchClients(); // Fetch the data again with the new sort order
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: 'auto',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.fetchClients(); // Refresh client list after adding a new client
      }
    });
  }

  openDialog(row: ClientData): void {
    const dialogRef = this.dialog.open(InfoClientComponent, {
      width: '30vw',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: row,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log("Client info was updated:", result.data);
        this.fetchClients(); // Refresh the client list after editing
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

  fetchClients(): void {
    const sortField = this.sort?.active || 'fullName'; // Default sorting field
    const sortDirection = this.sort?.direction || 'asc'; // Default sorting direction
  
    // Construct the pageable parameters
    const pageable = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: [`${sortField},${sortDirection}`]
    };
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';
    // Send pageable object to the OpenAPI-generated getProducts method
    this.clientService.getAllClients({ pageable }, {headers})
      .then((response: any) => {
        if (response && response.content) {
          this.clients = response.content; // Extract content from the response
          this.totalItems = response.totalElements || 0; // Extract total items
          this.dataSource = new MatTableDataSource(this.clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }
  
  
}
