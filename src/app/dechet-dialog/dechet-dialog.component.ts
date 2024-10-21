import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dechet-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Include ReactiveFormsModule for formGroup
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dechet-dialog.component.html',
})
export class DechetDialogComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DechetDialogComponent>
  ) {
    // Initialize the form with a single 'dechet' field
    this.formGroup = this.fb.group({
      dechet: ['', Validators.required],  // You can add more validators as needed
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);  // Pass the 'dechet' field value back
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
