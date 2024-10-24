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
import { CommonModule, DatePipe } from '@angular/common';
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
  providers: [ProductControllerApi, WorkshopControllerApi, ProductionPlanControllerApi,DatePipe]
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
    private datePipe: DatePipe ,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fetchProducts(); 
this.fetchWorkshops() ; 
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

    this.productService.getAllProduct({  })
      .then((response: any) => {
        console.log
        this.products = response;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  // Fetch workshops from API
  fetchWorkshops(): void {
        const pageable = { page: null, size: null, sort: null };

    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    this.workshopService.getAllWorkshops1()
      .then((response: any) => {
        this.workshops = response;
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching workshops:', error);
      });
  }

  onSubmit(): void {



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
  
    console.log(this.formGroup);
    console.log('******************************************************');
    console.log(productionPlanRequestDTO);
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

  getSelectedProductDetails() {
    const selectedProductId = this.formGroup.get('productId')?.value;
    const selectedProduct = this.products.find(product => product.id === selectedProductId);
    console.log('Selected Product:', selectedProduct);  // Debugging the selected product data
    return selectedProduct;
  }

  onReset(): void {
    this.formGroup.reset();
    this.selectedProduct = null;
    this.selectedWorkshop = null;
  }
  formatDuration(duration: string): string {
    const durationParts = duration.split(' '); // Example input: '45 minutes'
    if (durationParts.length === 2 && durationParts[1] === 'minutes') {
      const minutes = parseInt(durationParts[0], 10);
      return this.convertMinutesToHHMMSS(minutes);
    }
    return duration; // Return the duration as it is if the format doesn't match
  }

  // Convert the minutes to 'HH:mm:ss' format
  convertMinutesToHHMMSS(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${this.pad(hours, 2)}:${this.pad(mins, 2)}:00`; // Assuming no seconds
  }

  // Helper method to pad numbers to 2 digits
  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}

