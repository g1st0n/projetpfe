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
    private tokenService: TokenService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.designation || '', Validators.required],
      address: [data?.subCategory || '', Validators.required],
      phoneNumber: [data?.rawMaterial || '', Validators.required],
      status: [data?.color || '', Validators.required]
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
    console.log(this.formGroup);
    // Prepare the clientRequestDTO based on form values
    const userRequestDTO = {
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      address: this.formGroup.get('address')?.value,
      phoneNumber: this.formGroup.get('phoneNumber')?.value,
      status: this.formGroup.get('status')?.value,
      image: this.selectedFile
    };
    console.log(userRequestDTO);
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';
    // Send the client request to the API service using createClient()
    this.userService.createUser({ userRequestDTO } , {headers})
      .then((response) => {
        console.log('Client created successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Error creating client:', error);
      });
  }

}
