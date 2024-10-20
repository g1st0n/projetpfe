import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-add-client',
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
    ClientControllerApi // Provide your client API service here
  ],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
  @Output() clientSaved = new EventEmitter<void>(); // Emit an event when a client is saved
  formGroup: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // Preview for potential logo (optional)
  selectedFile: File | null = null; // Store the selected image file

  constructor(
    private fb: FormBuilder,
    private clientService: ClientControllerApi,
    public dialogRef: MatDialogRef<AddClientComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting dialog data for editing
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      fullName: [data?.fullName || '', Validators.required],
      clientType: [data?.clientType || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || '', Validators.required],
      telephone: [data?.telephone || '', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    // If editing and the client has a logo, initialize the image preview (optional)
    if (data?.logo && data?.logoType) {
      this.imagePreview = `data:${data.logoType};base64,${data.logo}`;
    }
  }

  // Handle image file selection (optional)
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.selectedFile = file; // Store the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set image preview
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger file input click event (optional)
  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }

  // Clear the image preview and file input (optional)
  deleteImage(): void {
    this.imagePreview = null;
    this.selectedFile = null; // Clear the selected file
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.value = '';
  }

  onSubmit(): void {
    // Prepare the clientRequestDTO based on form values
    const clientRequestDTO = {
      fullName: this.formGroup.get('fullName')?.value,
      clientType: this.formGroup.get('clientType')?.value,
      email: this.formGroup.get('email')?.value,
      address: this.formGroup.get('address')?.value,
      telephone: this.formGroup.get('telephone')?.value
      
    };
   
    // Send the client request to the API service using createClient()
    this.clientService.createClient({ clientRequestDTO })
      .then((response) => {
        console.log('Client created successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Error creating client:', error);
      });
  }
}
