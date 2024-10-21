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
import { TokenService } from '../../../../network/openapi/apis/tokenService';
import { ProductControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { OrderControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { ClientControllerApi } from 'src/network/openapi/apis/';  // Import the API service
import { ProductResponse } from 'src/network/openapi/models/';
import { ClientResponseDTO } from 'src/network/openapi/models/';

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
    CategorieControllerApi,
    ProductControllerApi ,
    ClientControllerApi,
    OrderControllerApi // Provide your sous-categorie API service here
  ],
  templateUrl: './add-commande.component.html',
  styleUrl: './add-commande.component.scss'
})
export class AddCommandeComponent {
  selectedProduct: ProductResponse | null = null; 
  selectedClient: ClientResponseDTO | null = null; 
  products: ProductResponse[] = [];
  clients: ClientResponseDTO[] = [];

  @Output() sousCategorieSaved = new EventEmitter<void>();
  formGroup: FormGroup;

  constructor(
    private productService: ProductControllerApi,
    private clientService: ClientControllerApi,
    private orderService: OrderControllerApi,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCommandeComponent>,
    private http: HttpClient,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form
    this.formGroup = this.fb.group({
      clientId: [data?.idClient || '', Validators.required],
      productId: [data?.productId || '', Validators.required],
      dateCommande: [data?.dateCommande || '', Validators.required],
      quantity: [data?.quantity || '', [Validators.required, Validators.min(1)]]
    });
    
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchClients();
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

  getSelectedProductDetails(): ProductResponse | null {
    const selectedProductId = this.formGroup.get('productId')?.value;
    if (selectedProductId) {
      return this.products.find(product => product.id === selectedProductId) || null;
    }
    return null;
  }
  
  getSelectedClientDetails(): ClientResponseDTO | null {
    const selectedClientId = this.formGroup.get('idClient')?.value;
    if (selectedClientId) {
      return this.clients.find(client => client.idClient === selectedClientId) || null;
    }
    return null;
  }

   // Fetch products from API
   fetchClients(): void {
    const pageable = { page: null, size: null, sort: null };
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';

    this.clientService.getClients({ pageable }, { headers })
      .then((response: any) => {
        this.clients = response.content;
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }

  onSubmit(): void {
    // Prepare the clientRequestDTO based on form values
    const orderRequestDTO = {
      clientId: this.formGroup.get('clientId')?.value,
      productId: this.formGroup.get('productId')?.value,
      date: this.formGroup.get('dateCommande')?.value,
      quantity: this.formGroup.get('quantity')?.value,
      
    };
    const headers = this.tokenService.getAuthHeaders();
    headers['Content-Type'] = 'application/json';
    // Send the client request to the API service using createClient()
    this.orderService.createOrder({ orderRequestDTO }, {headers})
      .then((response) => {
        console.log('Order created successfully:', response);
        this.dialogRef.close({ success: true, data: response });
      })
      .catch((error) => {
        console.error('Order creating client:', error);
      });
  }

}
