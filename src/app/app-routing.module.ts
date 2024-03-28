import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './admin/shared/services/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () =>import('./public/public.module').then((m)=>PublicModule)
  },
  {
    path:'admin',
    loadChildren: () =>import('./admin/admin.module').then((m)=>AdminModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
