import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatModule } from 'src/app/appModules/mat.module';

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [CommonModule,MatModule],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss'
})
export class DialogAddProductComponent {

  imagePreview: string | ArrayBuffer | null = null;
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required]
    });
  }
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }
  deleteImage(): void {
    this.imagePreview = null; // Clear the image preview
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.value = ''; // Clear the file input so the user can select a new file if needed
  }
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);  // Pass the form data back on close
    }
  }
}
