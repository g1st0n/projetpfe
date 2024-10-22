import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductionPlanControllerApi } from '../../network/openapi/apis/ProductionPlanControllerApi'; // Update the service path as needed
import { TokenService } from '../../network/openapi/apis/tokenService'; // Update the service path as needed
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';    
import { MatInputModule } from '@angular/material/input';  
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';  

@Component({
  selector: 'app-dechet-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductionPlanControllerApi,
    TokenService,
  ],
  templateUrl: './dechet-dialog.component.html',
  styleUrls: ['./dechet-dialog.component.scss']
})
export class DechetDialogComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productionPlanService: ProductionPlanControllerApi,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<DechetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      waste: ['', Validators.required], // The field 'waste' is required
    });
  }

  // Handle form submission
  onSubmit(): void {
    console.log(this.data);
    if (this.formGroup.valid) {
      // Prepare the request DTO
      const productionPlanRequestDTO = {
        planningId : this.data.idPlanning,
        waste: this.formGroup.get('waste')?.value,
      };

      const headers = this.tokenService.getAuthHeaders();
      headers['Content-Type'] = 'application/json';

      // Call the service to update the production plan
      this.productionPlanService.confirmProductionPlan( {productionPlanRequestDTO } , { headers })
        .then((response) => {
          console.log('Production plan updated successfully:', response);
          this.dialogRef.close({ success: true, data: response });
        })
        .catch((error) => {
          console.error('Error updating production plan:', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  // Handle dialog cancel
  onCancel(): void {
    this.dialogRef.close();  // Close the dialog without passing any data
  }
}
