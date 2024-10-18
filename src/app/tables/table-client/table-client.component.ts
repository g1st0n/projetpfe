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

const CLIENTS = [
  { idClient: 1, clientType: "société", fullName: "GPRO consulting", email: "Gpro.consulting@gmail.com", address: "15 Bilel Ben Rabbeh", telephone: 12345678 },
  // Add more client data here...
];

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
  dataSource: MatTableDataSource<ClientData>;
  clients: ClientData[] = [];
  totalItems = 0; // For paginator
  pageSize = 10; // Default page size
  pageIndex = 0; // Default page index

  selection = new SelectionModel<ClientData>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private clientService: ClientControllerApi
  ) {
    this.dataSource = new MatTableDataSource(CLIENTS); // Initial data
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
    const sortField = this.sort?.active || 'name'; // Default to sorting by 'name'
    const sortDirection = this.sort?.direction || 'asc'; // Default to ascending sort
  
    // Construct the pageable parameters
    const pageable = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: [`${sortField},${sortDirection}`]  // Combine field and direction
    };
    // Send pageable object to the OpenAPI-generated getProducts method
    this.clientService.getClients({ pageable })
      .then((response: any) => {
        this.clients = response.content; // Assuming backend returns { content, totalElements }
        this.totalItems = response.totalElements; // The total number of products
  
        // Assign data to the table data source and update paginator and sorter
        this.dataSource = new MatTableDataSource(this.clients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
  
}
