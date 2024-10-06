import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';

const routes: Routes = [
  {
    path: 'dialog-Add-product' , component: DialogAddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dialogPopRoutingModule { }
