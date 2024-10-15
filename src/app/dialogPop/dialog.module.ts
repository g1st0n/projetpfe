import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from '../appModules/mat.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';



@NgModule({
  declarations: [
    DialogComponentComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    MatDialogModule,
    DialogAddProductComponent,
  ]
})
export class dialogPopModule { }
