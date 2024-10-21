import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,  // Import ReactiveFormsModule for form handling
    MatDialogModule       // Import MatDialogModule for dialog functionalities
  ],
  providers: [
    ClientControllerApi // Provide the ClientControllerApi service
  ],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  @Output() clientSaved = new EventEmitter<void>(); // Emit an event when a client is saved
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientControllerApi, // Inject the ClientControllerApi service
    public dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      fullName: [data?.fullName || '', Validators.required],
      clientType: [data?.clientType || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      address: [data?.address || '', Validators.required],
      telephone: [data?.telephone || '', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
    });
  }

  onSubmit(): void {
    // Prepare the clientRequestDTO based on form values
    const clientRequestDTO = {
      clientId: this.data?.idClient,
      fullName: this.formGroup.get('fullName')?.value,
      clientType: this.formGroup.get('clientType')?.value,
      email: this.formGroup.get('email')?.value,
      address: this.formGroup.get('address')?.value,
      telephone: this.formGroup.get('telephone')?.value
    };

    // Send the client request to the API service using createClient()
    this.clientService.updateClient({ clientRequestDTO })
      .then((response) => {
        console.log('Client updated successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Error updating client:', error);
      });
  }
}
