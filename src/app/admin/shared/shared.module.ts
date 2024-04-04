import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionToolbarComponent } from './components/action-toolbar/action-toolbar.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DemoMaterialModule } from 'src/material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AgGridComponent } from './components/ag-grid/ag-grid.component';


@NgModule({
  declarations: [
    ActionToolbarComponent,
    HeaderMenuComponent,
    HeaderComponent,
    SidebarComponent,
    AgGridComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports:[
    HeaderMenuComponent,
    ActionToolbarComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
