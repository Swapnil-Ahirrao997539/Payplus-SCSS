import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { DemoMaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    ActionToolbarComponent,
    HeaderMenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    DemoMaterialModule
  ],
  exports:[HeaderMenuComponent,ActionToolbarComponent]
})
export class SharedModule { }
