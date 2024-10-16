import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CategorieControllerApi } from 'src/network/openapi/apis/';  // Adjust the import to your sous-categorie API
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { MatModule } from 'src/app/appModules/mat.module';

@Component({
  selector: 'app-add-commande',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatModule
  ],
  providers: [
    CategorieControllerApi  // Provide your sous-categorie API service here
  ],
  templateUrl: './add-commande.component.html',
  styleUrl: './add-commande.component.scss'
})
export class AddCommandeComponent {
  selectedProduct: string | null = null; 

  @Output() sousCategorieSaved = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCommandeComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      reference: [data?.reference || '', Validators.required],
      subCategory: [data?.subCategory || '', Validators.required],
      typeMatiere: [data?.typeMatiere || '', Validators.required]
    });
  }

  // Function to handle sous-categorie submission
  onSubmit(): void {
    const sousCategorieData = this.formGroup.value;  // Get form data

    // Determine if this is an update or a new sous-catégorie
    if (this.data?.id) {
      // If updating, use PUT method and send the sous-catégorie ID
      this.http.put(`http://localhost:8080/api/sous-categories/${this.data.id}`, sousCategorieData).subscribe(
        (response: any) => {
          console.log('Sous-catégorie updated successfully:', response);
          this.dialogRef.close({ success: true, data: response });  // Close dialog with success
        },
        (error) => {
          console.error('Error updating sous-catégorie:', error);
        }
      );
    } else {
      // If adding a new sous-catégorie, use POST method
      this.http.post('http://localhost:8080/api/sous-categories/add', sousCategorieData).subscribe(
        (response: any) => {
          console.log('Sous-catégorie saved successfully:', response);
          this.dialogRef.close({ success: true, data: response });  // Close dialog with success
        },
        (error) => {
          console.error('Error saving sous-catégorie:', error);
        }
      );
    }
  }
}
