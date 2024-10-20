import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientControllerApi, RawMaterialControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-matiere-premiere',
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
    RawMaterialControllerApi 
  ],
  templateUrl: './edit-matiere-premiere.component.html',
  styleUrl: './edit-matiere-premiere.component.scss'
})
export class EditMatierePremiereComponent {
  @Output() RawSaved = new EventEmitter<void>(); // Emit an event when a client is saved
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rawService: RawMaterialControllerApi, // Inject the ClientControllerApi service
    public dialogRef: MatDialogRef<EditMatierePremiereComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      Nom: [data?.name || '', Validators.required],
      TypeMatiere: [data?.materialType || '', Validators.required],
      PrixUni: [data?.unitPrice || '', [Validators.required]],
      Origine: [data?.origin || '', Validators.required],
      Couleur: [data?.color || '', [Validators.required]],
      unite: [data?.unit || '', [Validators.required]],
      QuantiteDispo: [data?.availableQuantity || '', Validators.required],
      Fournisseur: [data?.supplier || '', [Validators.required]],
    });
  }
  onSubmit(): void {
    // Prepare the clientRequestDTO based on form values
    const rawMaterialRequestDTO = {
      idMaterial: this.data?.idMaterial,
      name: this.formGroup.get('Nom')?.value,
      materialType: this.formGroup.get('TypeMatiere')?.value,
      unitPrice: this.formGroup.get('PrixUni')?.value,
      origin: this.formGroup.get('Origine')?.value,
      color: this.formGroup.get('Couleur')?.value,
      unite: this.formGroup.get('unite')?.value,
      QuantiteDispo: this.formGroup.get('QuantiteDispo')?.value,
      supplier: this.formGroup.get('Fournisseur')?.value

    };

    // Send the client request to the API service using createClient()
    this.rawService.updateRawMaterial({ rawMaterialRequestDTO })
      .then((response) => {
        console.log('Client updated successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Error updating client:', error);
      });
  }
}
