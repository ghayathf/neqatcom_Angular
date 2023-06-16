import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LenderStoreRequestComponent } from './lender-store-request/lender-store-request.component';
import { MainComponent } from './main/main.component';
import { AllLoaneesComponent } from './all-loanees/all-loanees.component';
import { ManageLoaneeComplaintsComponent } from './manage-loanee-complaints/manage-loanee-complaints.component'
import { ProfileComponent } from './profile/profile.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageLenderComplaintsComponent } from './manage-lender-complaints/manage-lender-complaints.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'LenderStoreRequest',
    component: LenderStoreRequestComponent
  },
  {
    path: 'loanees',
    component: AllLoaneesComponent
  },
  {
    path: 'loaneeComplaints',
    component: ManageLoaneeComplaintsComponent
  },
  {
    path: 'Edit-Profile',
    component: ProfileComponent
  },
  {
    path: 'ContactMessages',
    component: ContactMessagesComponent
  },
  {
    path: 'EditHome',
    component: EditHomeComponent
  },
  {
    path: 'Categories',
    component: CategoriesComponent
  },
  {
    path: 'changePass',
    component: ChangePasswordComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  },
  {
    path:'lenderComplaints',
    component:ManageLenderComplaintsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
