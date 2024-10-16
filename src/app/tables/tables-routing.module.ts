import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortingTableComponent } from './table-produit/sorting-table.component';
import { TableSousCategorieComponent } from './table-sous-categorie/table-sous-categorie.component';
import { TableClientComponent } from './table-client/table-client.component';
import { TableCommandeComponent } from './table-commande/table-commande.component';
import { TableAtelierComponent } from './table-atelier/table-atelier.component';
import { TableMatierePremiereComponent } from './table-matiere-premiere/table-matiere-premiere.component';
import { TableResponsableComponent } from './table-responsable/table-responsable.component';

const routes: Routes = [

  
  
  {
    path: '',
    children: [
      {
        path: 'table-produit',
        component: SortingTableComponent,
        data: {
          title: 'TableProduit'
        }
      },
      
      {
      path: 'Sous-categorie',
        component: TableSousCategorieComponent,
        data: {
          title: 'sous-categorie'
        }
      },
      {
        path: 'table-client',
        component: TableClientComponent,
        data: {
          title: 'table-client'
        }
      },
      {
        path: 'table-commande',
        component: TableCommandeComponent,
        data: {
          title: 'table-commande'
        }
      },
      {
        path: 'table-atelier',
        component: TableAtelierComponent,
        data: {
          title: 'table-atelier'
        }
      },
      {
        path: 'table-Matiere-Premier',
        component: TableMatierePremiereComponent,
        data: {
          title: 'table-Matiere-Premiere'
        }
      },
      {
        path: 'table-Responsable',
        component: TableResponsableComponent,
        data: {
          title: 'table-responsable'
        }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
