import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CategorieControllerApi, SubCategoryControllerApi } from 'src/network/openapi/apis/';  // Adjust the import to your sous-categorie API
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient

@Component({
  selector: 'app-sous-categorie-add',
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
    SubCategoryControllerApi  // Provide your sous-categorie API service here
  ],
  templateUrl: './sous-categorie-add.component.html',
  styleUrl: './sous-categorie-add.component.scss'
})
export class SousCategorieAddComponent {
  @Output() sousCategorieSaved = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private SubcategorieService: SubCategoryControllerApi,
    public dialogRef: MatDialogRef<SousCategorieAddComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      Nom: [data?.name || '', Validators.required],
      reference: [data?.reference || '', Validators.required],
    });
  }

  // Function to handle sous-categorie submission
  onSubmit(): void {

    const subCategoryRequestDTO ={ 

    name: this.formGroup.get('Nom')?.value,
    reference: this.formGroup.get('reference')?.value,

    };
      console.log(subCategoryRequestDTO)

      this.SubcategorieService.createSubCategory({ subCategoryRequestDTO })
      .then((response) => {
        console.log('Client created successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Error creating client:', error);
      });
  
}
}
