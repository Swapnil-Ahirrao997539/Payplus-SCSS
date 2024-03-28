import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionToolbarComponent } from './components/action-toolbar/action-toolbar.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { DemoMaterialModule } from 'src/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    ActionToolbarComponent,
    HeaderMenuComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports:[
    HeaderMenuComponent,
    ActionToolbarComponent,
    HeaderComponent,
    SidebarComponent]
})
export class SharedModule { }
