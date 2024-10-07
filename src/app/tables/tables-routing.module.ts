import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortingTableComponent } from './sorting-table/sorting-table.component';
import { SousCategorieComponent } from './sous-categorie/sous-categorie.component';

const routes: Routes = [

  
  
  {
    path: '',
    children: [
      {
        path: 'sorting-table',
        component: SortingTableComponent,
        data: {
          title: 'Sorting Table'
        }
      },
      {
      path: 'sous-categorie',
      component: SousCategorieComponent,
      data: {
        title: 'sous-categorie'
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
