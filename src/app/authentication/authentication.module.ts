import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { TypeOfuserComponent } from './type-ofuser/type-ofuser.component';
import { SharedModule } from '../shared/shared.module';
import { LenderComponent } from './lender/lender.component';
import { LoaneeComponent } from './loanee/loanee.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminModule } from '../admin/admin.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { Lender2Component } from './lender2/lender2.component';
import { Loanee2Component } from './loanee2/loanee2.component';

@NgModule({
  declarations: [
    LoginComponent,
    TypeOfuserComponent,
    LenderComponent,
    LoaneeComponent,
    Lender2Component,
    Loanee2Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
    AdminModule,
    AdminRoutingModule,
    MatIconModule,
  ],
})
export class AuthenticationModule {}
