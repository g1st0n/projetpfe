import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { ProductControllerApi } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/apis/'; 
import { FileStorageControllerApi } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/apis/'; 
import { FileStorageRequest } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/models/'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [
    ProductControllerApi,
    FileStorageControllerApi
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})

export class DialogAddProductComponent {

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;  // Store the selected image file
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductControllerApi,
    private fileService: FileStorageControllerApi,  // Inject the FileService here
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.fb.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      productionTime: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      productionCost: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.selectedFile = file;  // Store the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }

  deleteImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;  // Clear the selected file
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.value = '';
  }

  onSubmit(): void {
    // If a file (logo) is selected, first upload the file
    if (this.selectedFile) {
      const logoFormData = new FormData();
      logoFormData.append('file', this.selectedFile);
      const fileRequest: FileStorageRequest = {
        fileName: this.selectedFile.name,
        fileType: this.selectedFile.type,
        data: this.selectedFile  // Assuming 'data' should hold the file binary data.
      };

      this.fileService.uploadFile({ FileStorageRequest : fileRequest }) // Pass form data directly
        .then((fileResponse: any) => {
          console.log('File uploaded successfully:', fileResponse);
          
          // Once the file is uploaded, submit the product request with the file ID
          const fileId = fileResponse.id;
          this.submitProduct(fileId);
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
        });
    } else {
      // If no file is selected, just submit the product without logo
      this.submitProduct(null);
    }
  }

  submitProduct(logoId: string | null): void {
    const productData = this.formGroup.value;

    // Attach logo ID if it exists
    if (logoId) {
      productData.logo = logoId;
    }

    // Now, submit the product with the logo ID (if exists)
    this.productService.saveProduct({ productRequest: productData })
      .then((response) => {
        console.log('Product saved successfully:', response);
        this.dialogRef.close(response);  // Close the dialog and return the response
      })
      .catch((err) => {
        console.error('Error saving product:', err);
      });
  }
}
