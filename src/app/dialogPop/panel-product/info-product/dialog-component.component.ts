import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { DialogAddProductComponent } from '../add-product/dialog-add-product.component';  // Adjust path accordingly
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  // Injecting data passed from openDialog
    private dialog: MatDialog,  // Inject MatDialog here
    private http: HttpClient
  ) {}

   // Close the dialog and pass a success flag
   onClose(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close({ success: true });
    });
  }

  onEdit(): void {
    // Assuming you have the Add Product dialog component as 'DialogAddProductComponent'
    this.dialogRef.close(); // Close the current dialog first
    const dialogRef = this.dialog.open(DialogAddProductComponent, {
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

  onDownload(productId: number): void {
    const apiUrl = `http://localhost:8080/api/products/generate/${productId}`;

    // Make a GET request to the backend API to get the PDF
    this.http.get(apiUrl, { responseType: 'blob' }).subscribe((pdfBlob: Blob) => {
      // Create a URL from the Blob and trigger download
      const fileURL = URL.createObjectURL(pdfBlob);
      const fileName = `${this.data.designation.replace(/\s+/g, '-')}-details.pdf`;
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(fileURL); // Clean up the URL object after download
    }, error => {
      console.error('Error downloading PDF:', error);
    });
  }
}