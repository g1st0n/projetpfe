import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComingSoonComponent } from './coming-soon/coming-soon.component';

const routes: Routes = [ {
 
 
      path: 'coming-soon',
      component: ComingSoonComponent,
      data: {
        title: 'Coming Soon'
      }
    
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
