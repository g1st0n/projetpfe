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
import { TokenService } from '../../../../network/openapi/apis/tokenService';
import { MatSelectModule } from '@angular/material/select';  // Add this
import { MatOptionModule } from '@angular/material/core';    // Add this

@Component({
  selector: 'app-add-responsable',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,  
    MatOptionModule,   
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
    private tokenService: TokenService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [data?.phoneNumber || '', Validators.required],
      status: [data?.status || '', Validators.required],
      password: ['', Validators.required],  // Password field
      role: [data?.role || '', Validators.required]  // Role selection
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

  onSubmit(): void {
    const formData = new FormData();  // Create FormData to send as multipart/form-data

    // Append the form fields to FormData
    formData.append('firstName', this.formGroup.get('firstName')?.value);
    formData.append('lastName', this.formGroup.get('lastName')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('phoneNumber', this.formGroup.get('phoneNumber')?.value);
    formData.append('status', this.formGroup.get('status')?.value);
    formData.append('password', this.formGroup.get('password')?.value);
    formData.append('role', this.formGroup.get('role')?.value);
    formData.append('address', this.formGroup.get('email')?.value);

    // If a file (image) is selected, append it to the form
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);  // Append the image file
    }

    const headers = this.tokenService.getAuthHeaders();
    // Remove 'Content-Type' header because FormData sets it automatically
    delete headers['Content-Type'];

    console.log(formData);

    // If adding a new user, use POST method
    this.http.post('http://localhost:8080/api/users/add', formData, { headers }).subscribe(
      (response: any) => {
        console.log('User created successfully:', response);
        this.dialogRef.close({ success: true, data: response });  // Close the dialog with success data
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
}

}
