import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortingTableComponent } from './sorting-table/sorting-table.component';

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
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
