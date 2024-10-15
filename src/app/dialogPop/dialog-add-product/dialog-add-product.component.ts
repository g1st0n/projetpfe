import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { ProductControllerApi } from 'src/network/openapi/apis/'; 
import { FileStorageControllerApi } from 'src/network/openapi/apis/'; 
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
    private fileService: FileStorageControllerApi,
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form group with required fields
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

  // Handle image file selection
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

  // Trigger file input click event
  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }

  // Clear the image preview and file input
  deleteImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;  // Clear the selected file
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.value = '';
  }

  // Function to handle product submission and logo upload
  onSubmit(): void {
    const formData = new FormData();  // Create FormData to send as multipart/form-data

    // Append the form fields to FormData
    formData.append('reference', this.formGroup.get('reference')?.value);
    formData.append('designation', this.formGroup.get('designation')?.value);
    formData.append('color', this.formGroup.get('color')?.value);
    formData.append('weight', this.formGroup.get('weight')?.value);
    formData.append('dimension', this.formGroup.get('dimensions')?.value);
    formData.append('productionDuration', this.formGroup.get('productionTime')?.value);
    formData.append('price', this.formGroup.get('price')?.value);
    formData.append('quantity', this.formGroup.get('quantity')?.value);
    formData.append('productionCost', this.formGroup.get('productionCost')?.value);

    // If a file (logo) is selected, append it to the form
    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);  // Append the file
    }

    // Send the form data as a multipart/form-data request
    this.http.post('http://localhost:8080/api/products/add', formData).subscribe(
      (response: any) => {
        console.log('Product saved successfully:', response);
        this.dialogRef.close(response);  // Close the dialog
      },
      (error) => {
        console.error('Error saving product:', error);
      }
    );
  }
}
