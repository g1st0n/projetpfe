import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { UserControllerApi } from 'src/network/openapi/apis/'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-add-responsable',
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
    UserControllerApi,
  ],  templateUrl: './add-responsable.component.html',
  styleUrl: './add-responsable.component.scss'
})
export class AddResponsableComponent {
  @Output() productSaved = new EventEmitter<void>();
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;  // Store the selected image file
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserControllerApi,
    public dialogRef: MatDialogRef<AddResponsableComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      reference: [data?.reference || '', Validators.required],
      designation: [data?.designation || '', Validators.required],
      subCategory: [data?.subCategory || '', Validators.required],
      rawMaterial: [data?.rawMaterial || '', Validators.required],
      color: [data?.color || '', Validators.required],
      weight: [data?.weight || '', Validators.required],
      dimensions: [data?.dimension || '', Validators.required],
      productionTime: [data?.productionDuration || '', Validators.required],
      price: [data?.price || '', Validators.required],
      quantity: [data?.quantity || '', Validators.required],
      productionCost: [data?.productionCost || '', Validators.required]
    });

    // If editing and the product has a logo, initialize the image preview
    if (data?.logo && data?.logoType) {
      this.imagePreview = `data:${data.logoType};base64,${data.logo}`;
    }
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

    // Determine if this is an update or a new product
    if (this.data?.id) {
      // If updating, use PUT method and send the product ID
      this.http.put(`http://localhost:8080/api/products/${this.data.id}`, formData).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          this.dialogRef.close({ success: true, data: response });  
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // If adding a new product, use POST method
      this.http.post('http://localhost:8080/api/products/add', formData).subscribe(
        (response: any) => {
          console.log('Product saved successfully:', response);
          this.dialogRef.close({ success: true, data: response });  // Pass the response back to the parent component
        },
        (error) => {
          console.error('Error saving product:', error);
        }
      );
    }
  }
}
