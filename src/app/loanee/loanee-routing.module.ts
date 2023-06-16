import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyloansComponent } from './myloans/myloans.component';
import { ConfirmLoansComponent } from './confirm-loans/confirm-loans.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'EditProfile',
    component: EditProfileComponent},
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'Myloans',
    component: MyloansComponent
  },

  {
    path:'ConfirmLoans',
    component:ConfirmLoansComponent
  },
  {
    path: "Testimonial",
    component: TestimonialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaneeRoutingModule { }
