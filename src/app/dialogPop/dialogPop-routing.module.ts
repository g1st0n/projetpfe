import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogAddProductComponent } from './panel-product/add-product/dialog-add-product.component';
import { DialogsouscategorieComponent } from './panel-sous-produit/info-sous-categorie/dialogsouscategorie.component';
import { AddClientComponent } from './panel-client/add-client/add-client.component';

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
  },
  {
    path: 'dialog-Add-Client' , 
    component: AddClientComponent
  },
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dialogPopRoutingModule { }
