import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { ServletExceptionComponent } from './login/servlet-exception/servlet-exception.component';

const routes: Routes = [
  {
     path:'',
     component:PublicComponent,

     children:[
      {path:'',component: LoginComponent},
      {path:'servlet-exception',component: ServletExceptionComponent}

     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
