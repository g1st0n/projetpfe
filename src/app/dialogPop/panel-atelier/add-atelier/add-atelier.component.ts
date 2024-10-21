import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CategorieControllerApi, ClientControllerApi, WorkshopControllerApi } from 'src/network/openapi/apis/';  // Adjust the import to your sous-categorie API
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { TokenService } from 'src/network/openapi/apis/tokenService';
@Component({
  selector: 'app-add-atelier',
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
    WorkshopControllerApi  // Provide your sous-categorie API service here
  ],
  templateUrl: './add-atelier.component.html',
  styleUrl: './add-atelier.component.scss'
})
export class AddAtelierComponent {
  @Output() sousCategorieSaved = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workShopService: WorkshopControllerApi,
    public dialogRef: MatDialogRef<AddAtelierComponent>,
    private http: HttpClient,
    private tokenService: TokenService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      NumAtelier: [data?.workshopNumber || '', Validators.required],
      Capacite: [data?.productionCapacity || '', Validators.required],
      NbMachine: [data?.machineCount || '', Validators.required],
      CoutMachine: [data?.machineCost || '', Validators.required]

    });
  }

  // Function to handle sous-categorie submission
  onSubmit(): void {
    const workshopRequestDTO ={ 

      workshopNumber: this.formGroup.get('NumAtelier')?.value,
      productionCapacity: this.formGroup.get('Capacite')?.value,
      machineCount: this.formGroup.get('NbMachine')?.value,
      machineCost: this.formGroup.get('CoutMachine')?.value

  
      };

        this.workShopService.createWorkshop({ workshopRequestDTO })
        .then((response) => {
          console.log('Client created successfully:', response);
          this.dialogRef.close({ success: true, data: response });
        })
        .catch((error) => {
          console.error('Error creating client:', error);
        });
    
  }
}