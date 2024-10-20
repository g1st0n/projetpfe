import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RawMaterialControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-matiere-premiere',
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
    RawMaterialControllerApi // Provide the RawMaterial API service
  ],
  templateUrl: './add-matiere-premiere.component.html',
  styleUrls: ['./add-matiere-premiere.component.scss']
})
export class AddMatierePremiereComponent {
  @Output() rawMaterialSaved = new EventEmitter<void>(); // Emit an event when raw material is saved
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rawMaterialService: RawMaterialControllerApi,
    public dialogRef: MatDialogRef<AddMatierePremiereComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting dialog data for editing
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      Nom: [data?.name || '', Validators.required],
      TypeMatiere: [data?.materialType || '', Validators.required],
      PrixUni: [data?.unitPrice || '', Validators.required],
      Origine: [data?.origine || '', Validators.required],
      Couleur: [data?.color || '', Validators.required],
      Unite: [data?.unit || '', Validators.required],
      QuantiteDispo: [data?.availableQuantity || '', Validators.required],
      Fournisseur: [data?.supplier || '', Validators.required],
    });
  }

  onSubmit(): void {
    // Prepare the rawMaterialRequestDTO based on form values
    const rawMaterialRequestDTO = {
      name: this.formGroup.get('Nom')?.value,
      materialType: this.formGroup.get('TypeMatiere')?.value,
      unitPrice: this.formGroup.get('PrixUni')?.value,
      origin: this.formGroup.get('Origine')?.value,
      color: this.formGroup.get('Couleur')?.value,
      unite: this.formGroup.get('unite')?.value,
      QuantiteDispo: this.formGroup.get('QuantiteDispo')?.value,
      supplier: this.formGroup.get('Fournisseur')?.value

    };


     
      // If adding a ne raw material
      this.rawMaterialService.createRawMaterial({ rawMaterialRequestDTO })
        .then((response) => {
          console.log('Raw material created successfully:', response);
          this.dialogRef.close({ success: true, data: response });
        })
        .catch((error) => {
          console.error('Error creating raw material:', error);
        });
    }
  }

