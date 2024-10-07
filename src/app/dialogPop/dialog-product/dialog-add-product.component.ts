import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductControllerApi } from 'C:/Users/extreme pc/Documents/GhassenPFEFront/projetpfe/src/network/openapi/apis/';  // Import the API service
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';  
import { MatButtonModule } from '@angular/material/button';  
import { ReactiveFormsModule } from '@angular/forms';  

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductControllerApi  // Provide the API service here directly
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrls: ['./dialog-add-product.component.scss']
})
export class DialogAddProductComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductControllerApi,  // Inject the ProductService here
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.fb.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      productionTime: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      productionCost: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    const productData = this.formGroup.value;
  
    // Since saveProduct expects an object with a key 'productRequest', wrap the productData
    this.productService.saveProduct({ productRequest: productData })  // Wrapping productData in { productRequest: ... }
      .then((response) => {
        this.dialogRef.close(response);  // Close the dialog and return the response
      })
      .catch((err) => {
        console.error('Error saving product:', err);  // Handle error
      });
  }
}
