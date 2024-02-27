import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ]
})
export class PublicModule { }
