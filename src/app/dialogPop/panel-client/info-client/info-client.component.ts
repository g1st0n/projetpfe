import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { TokenService } from '../../../../network/openapi/apis/tokenService';
import { ClientControllerApi } from 'src/network/openapi/apis/';

@Component({
  selector: 'app-info-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-client.component.html',
  styleUrl: './info-client.component.scss'
})
export class InfoClientComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  // Injecting data passed from openDialog
    private dialog: MatDialog,  // Inject MatDialog here
    private http: HttpClient,
    private tokenService: TokenService,
    private clientService: ClientControllerApi,
  ) {}

  onEdit(): void {
    // Assuming you have the Add Product dialog component as 'DialogAddProductComponent'
    this.dialogRef.close(); // Close the current dialog first
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '80vw',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90vh',
      data: this.data,  
      panelClass: 'custom-dialog-container'
    });
     // Listen to the closing of the Add Product dialog
     dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Pass the result to the parent component
        dialogRef.close(result);
      }
    });
  }
  
  onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close({ success: true });
    });
  }

  onDownload(clientId: number): void {
    const headers = this.tokenService.getAuthHeaders(); // Retrieve token-based headers
    headers['Content-Type'] = 'application/json';
    const apiUrl = `http://localhost:8080/api/clients/generate/${clientId}`;

    // Make a GET request to the backend API to get the PDF
    this.http.get(apiUrl, { 
      headers: headers, // Include headers in the request
      responseType: 'blob'  // Set the responseType to 'blob' to handle binary data
    }).subscribe((pdfBlob: Blob) => {
      // Create a URL from the Blob and trigger download
      const fileURL = URL.createObjectURL(pdfBlob);
      const fileName = `${this.data.fullName.replace(/\s+/g, '-')}-details.pdf`;
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(fileURL); // Clean up the URL object after download
    }, error => {
      console.error('Error downloading PDF:', error);
    });
  }

  onDownloadTest(clientId: number): void {
    const headers = this.tokenService.getAuthHeaders(); // Ensure headers include the token
    headers['Content-Type'] = 'application/json';
    
    // Call the client service to generate the PDF
    this.clientService.generatePdf7({ clientId }, { headers }).then((response: string) => {
  
      // Convert the string response (binary string) into a byte array
      const byteArray = new Uint8Array(response.length);
      for (let i = 0; i < response.length; i++) {
        byteArray[i] = response.charCodeAt(i);
      }
  
      // Create a Blob from the byte array (PDF binary data)
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      // Create a URL for the Blob
      const fileURL = URL.createObjectURL(blob);
  
      // Construct the file name
      const fileName = `client_${clientId}.pdf`;
  
      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = fileName; // Set the file name for download
      a.click(); // Trigger the download
  
      // Clean up the URL object after download
      URL.revokeObjectURL(fileURL);
  
    }).catch((error) => {
      console.error('Error downloading PDF:', error); // Handle any errors
    });
  }   

}
