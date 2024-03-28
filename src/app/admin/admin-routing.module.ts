import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserPageComponent } from './userspage/user-page/user-page.component';
import { LegalEntiryComponent } from './legal-entity/legal-entiry/legal-entiry.component';
import { LegalEntityModule } from './legal-entity/legal-entity.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {path:'',component: AdminComponent ,
  children :[
    {
      path: '', component:UserPageComponent,
 
    },
    {
      path:'legal-entity',
      loadChildren: () =>import('./legal-entity/legal-entity.module').then((m)=>LegalEntityModule),  
    },
    {
      path:'shared',
      loadChildren: () =>import('./shared/shared.module').then((m)=> SharedModule),
      
    }

   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
