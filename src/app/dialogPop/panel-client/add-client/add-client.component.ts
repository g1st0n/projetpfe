import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CategorieControllerApi, ClientControllerApi } from 'src/network/openapi/apis/';  // Adjust the import to your sous-categorie API
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
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
    ClientControllerApi  // Provide your sous-categorie API service here
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  @Output() ClientService = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sousCategorieService: ClientControllerApi,
    public dialogRef: MatDialogRef<AddClientComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      telephone: [data?.telephone || '', Validators.required],
      Nom: [data?.fullName || '', Validators.required],
      TypeClient: [data?.clientType || '', Validators.required],
      Email: [data?.email || '', Validators.required],
      Adresse: [data?.address || '', Validators.required],
   
    });
  }

  // Function to handle sous-categorie submission
    onSubmit(): void {
      const formData = new FormData();  // Create FormData to send as multipart/form-data
  
      // Append the form fields to FormData
      formData.append('fullName', this.formGroup.get('Nom')?.value);
      formData.append('clientType', this.formGroup.get('TypeClient')?.value);
      formData.append('email', this.formGroup.get('Email')?.value);
      formData.append('address', this.formGroup.get('Adresse')?.value);
      formData.append('telephone', this.formGroup.get('telephone')?.value);

  
      
  
    if (this.data?.id) {
      // If updating, use PUT method and send the sous-catégorie ID
      this.http.put(`http://localhost:8080/api/clients/${this.data.id}`, formData,{
        
      }).subscribe(
        (response: any) => {
          
          console.log('Sous-catégorie updated successfully:', response);
          this.dialogRef.close({ success: true, data: response });  // Close dialog with success
        },
        (error) => {
          console.error('Error updating client:', error);
        }
      );
    } else {
      console.log('Full API Response:', formData);  // Log the full response

      // If adding a new sous-catégorie, use POST method
      this.http.post('http://localhost:8080/api/clients/add', formData).subscribe(
        (response: any) => {


          console.log('client saved successfully:', response);
          this.dialogRef.close({ success: true, data: response });  // Close dialog with success
        },
        (error) => {
          console.error('Error saving client:', error);
        }
      );
    }
  }
}