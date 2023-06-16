import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'Auth',
    loadChildren: () => import('./authentication/authentication.module').then(x => x.AuthenticationModule)
  },
  {
    path: 'Admin',
    loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lenderstore',
    loadChildren: () => import('./lender-store/lender-store.module').then(x => x.LenderStoreModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'Loanee',
    
    loadChildren: () => import('./loanee/loanee-routing.module').then(x => x.LoaneeRoutingModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
