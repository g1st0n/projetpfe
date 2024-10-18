import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

import { MatModule } from 'src/app/appModules/mat.module';




@NgModule({
  declarations: [
    SignInComponent, 
    
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatModule,

  ]
})
export class AuthModule { }
