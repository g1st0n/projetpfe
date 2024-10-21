import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientControllerApi, WorkshopControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-atelier',
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
    WorkshopControllerApi // Provide the ClientControllerApi service
  ],
  templateUrl: './edit-atelier.component.html',
  styleUrl: './edit-atelier.component.scss'
})
export class EditAtelierComponent {
  @Output() clientSaved = new EventEmitter<void>(); // Emit an event when a client is saved
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shopService: WorkshopControllerApi, // Inject the ClientControllerApi service
    public dialogRef: MatDialogRef<EditAtelierComponent>,
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
  onSubmit(): void {
    const workshopRequestDTO ={ 

      idWorkshop: this.data?.idWorkshop,

      workshopNumber: this.formGroup.get('NumAtelier')?.value,
      productionCapacity: this.formGroup.get('Capacite')?.value,
      machineCount: this.formGroup.get('NbMachine')?.value,
      machineCost: this.formGroup.get('CoutMachine')?.value

  
      };

        this.shopService.updateWorkshop({ workshopRequestDTO })
        .then((response) => {
          console.log('Client created successfully:', response);
          this.dialogRef.close({ success: true, data: response });
        })
        .catch((error) => {
          console.error('Error creating client:', error);
        });
    
  }
}
