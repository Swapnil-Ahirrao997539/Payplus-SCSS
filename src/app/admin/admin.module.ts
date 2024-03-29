import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserPageComponent } from './userspage/user-page/user-page.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LegalEntiryComponent } from './legal-entiry/legal-entiry.component';
import { DemoMaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    UserPageComponent,
    LegalEntiryComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    DemoMaterialModule,
    ReactiveFormsModule,

    
  ],
  providers: [
    provideAnimations()
  ]
})
export class AdminModule { }
