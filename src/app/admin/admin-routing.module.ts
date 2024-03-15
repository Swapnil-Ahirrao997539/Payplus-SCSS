import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserPageComponent } from './userspage/user-page/user-page.component';
import { LegalEntiryComponent } from './legal-entiry/legal-entiry.component';

const routes: Routes = [
  {path:'',component: AdminComponent ,
  children :[
    {path: '', component:UserPageComponent,
     children :[
       {path: 'admin', component:UserPageComponent},
      {path: 'legal-entity', component:LegalEntiryComponent}
    ]},
   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
