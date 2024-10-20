import { MatModule } from 'src/app/appModules/mat.module';
import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientControllerApi } from 'src/network/openapi/apis/';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { TokenService } from '../../../network/openapi/apis/tokenService';
import { ProductControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { WorkshopControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { ProductionPlanControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { ProductResponse } from 'src/network/openapi/models/';
import { WorkshopResponseDTO } from 'src/network/openapi/models/';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pricing',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,  // <-- Ensure this is imported
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    // Other necessary modules
  ],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  providers: [ProductControllerApi, WorkshopControllerApi, ProductionPlanControllerApi]
})
export class PricingComponent implements OnInit {
  @Output() clientSaved = new EventEmitter<void>();
  formGroup: FormGroup;
  selectedProduct: ProductResponse | null = null;
  selectedWorkshop: WorkshopResponseDTO | null = null;
  products: ProductResponse[] = [];
  workshops: WorkshopResponseDTO[] = [];

  constructor(
    private productService: ProductControllerApi,
    private workshopService: WorkshopControllerApi,
    private productionPlanService: ProductionPlanControllerApi,
    private tokenService: TokenService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchWorkshops();

    this.formGroup = this.fb.group({
      date: ['', Validators.required],
      productId: [null, Validators.required],
      workshopId: [null, Validators.required],
      quantity: ['', Validators.required],
      duration: ['', Validators.required],
      workforce: ['', Validators.required],
      comment: [''],
      checkbox: [false]
    });
  }

  // Fetch products from API
  fetchProducts(): void {
    const pageable = { page: null, size: null, sort: null };
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    this.productService.getProducts({ pageable }, { headers })
      .then((response: any) => {
        this.products = response.content;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  // Fetch workshops from API
  fetchWorkshops(): void {
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    this.workshopService.getAllWorkshops(null ,{ headers })
      .then((response: any) => {
        this.workshops = response;
      })
      .catch(error => {
        console.error('Error fetching workshops:', error);
      });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('Form is invalid:', this.formGroup.value);
      return;
    }
  
    // Ensure form values are properly set before sending
    const productionPlanRequestDTO = {
      date: this.formGroup.get('date')?.value,
      productId: this.formGroup.get('productId')?.value,
      workshopId: this.formGroup.get('workshopId')?.value, // Ensure this value is captured
      quantity: this.formGroup.get('quantity')?.value,
      duration: this.formGroup.get('duration')?.value,
      workforce: this.formGroup.get('workforce')?.value,
      comment: this.formGroup.get('comment')?.value,
    };
  
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';
  
    // Send the production plan request to the API
    this.productionPlanService.createProductionPlan({ productionPlanRequestDTO }, { headers })
      .then((response) => {
        console.log('Production plan created successfully:', response);
        this.formGroup.reset();
        this.selectedProduct = null;
        this.selectedWorkshop = null;
      })
      .catch((error) => {
        console.error('Error creating production plan:', error);
      });
  }  

  getSelectedProductDetails(): ProductResponse | null {
    if (this.selectedProduct && this.selectedProduct.logoType && this.selectedProduct.logo) {
      return this.selectedProduct;
    }
    return null;
  }

  onReset(): void {
    this.formGroup.reset();
    this.selectedProduct = null;
    this.selectedWorkshop = null;
  }
}

