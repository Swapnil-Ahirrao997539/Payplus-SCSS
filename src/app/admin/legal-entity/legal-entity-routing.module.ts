import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalEntiryComponent } from './legal-entiry/legal-entiry.component';
import { UserPageComponent } from '../userspage/user-page/user-page.component';

const routes: Routes = [
  {path:'',component: UserPageComponent ,
  children :[
    {
     path: '', component:LegalEntiryComponent,
     children :[
     // {path: 'legal-entity', component:LegalEntiryComponent}
    ]
    },


   
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalEntityRoutingModule { }
