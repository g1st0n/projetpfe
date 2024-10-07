import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogAddProductComponent } from './dialog-add-product/dialog-add-product.component';
import { DialogsouscategorieComponent } from './dialogsouscategorie/dialogsouscategorie.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
    path: 'dialog-Add-product' , 
    component: DialogAddProductComponent
  },
  {
    path: 'dialogsouscategorie' , 
    component: DialogsouscategorieComponent
  }
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dialogPopRoutingModule { }
