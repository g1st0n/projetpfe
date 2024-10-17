import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CategorieControllerApi, ClientControllerApi, RawMaterialControllerApi } from 'src/network/openapi/apis/';  // Adjust the import to your sous-categorie API
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
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
    RawMaterialControllerApi  // Provide your sous-categorie API service here
  ],  templateUrl: './add-matiere-premiere.component.html',
  styleUrl: './add-matiere-premiere.component.scss'
})
export class AddMatierePremiereComponent {
  @Output() RawMat = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rawMatierualController: RawMaterialControllerApi,
    public dialogRef: MatDialogRef<AddMatierePremiereComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      Nom: [data?.name || '', Validators.required],
      TypeMatiere: [data?.materialType || '', Validators.required],
      PrixUni: [data?.unitPrice || '', Validators.required],
      Origine: [data?.origin || '', Validators.required],
      Couleur: [data?.color || '', Validators.required],
      unite: [data?.unit || '', Validators.required],
      QuantiteDispo: [data?.availableQuantity || '', Validators.required],
      Fournisseur: [data?.supplier || '', Validators.required],
      productionCost: [data?.productionCost || '', Validators.required]
    });
    
  }

  // Function to handle sous-categorie submission
  onSubmit(): void {
    const formData = new FormData();  // Create FormData to send as multipart/form-data

    // Append the form fields to FormData
    formData.append('name', this.formGroup.get('Nom')?.value);
    formData.append('materialType', this.formGroup.get('TypeMatiere')?.value);
    formData.append('unitPrice', this.formGroup.get('PrixUni')?.value);
    formData.append('origin', this.formGroup.get('Origine')?.value);
    formData.append('color', this.formGroup.get('Couleur')?.value);
    formData.append('unit', this.formGroup.get('unite')?.value);
    formData.append('availableQuantity', this.formGroup.get('QuantiteDispo')?.value);
    formData.append('supplier', this.formGroup.get('Fournisseur')?.value);
    formData.append('productionCost', this.formGroup.get('productionCost')?.value);

    // If a file (logo) is selected, append it to the form
    

    // Determine if this is an update or a new product
    if (this.data?.id) {
      // If updating, use PUT method and send the product ID
      this.http.put(`http://localhost:8080/api/raw-materials/${this.data.id}`, formData).subscribe(
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
      this.http.post('http://localhost:8080/api/raw-materials/add', formData).subscribe(
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