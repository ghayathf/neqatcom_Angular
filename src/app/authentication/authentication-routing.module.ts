import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TypeOfuserComponent } from './type-ofuser/type-ofuser.component';
import { LenderComponent } from './lender/lender.component';
import { Lender2Component } from './lender2/lender2.component';
import { Loanee2Component } from './loanee2/loanee2.component';
import { LoaneeComponent } from './loanee/loanee.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'type',
    component: TypeOfuserComponent
  },
  {
    path: 'lender',
    component: LenderComponent
  },
  {
    path: 'lender2',
    component: Lender2Component
  },
  {
    path: 'loanee',
    component: LoaneeComponent
  },
  {
    path: 'loaneeInfo',
    component: Loanee2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
