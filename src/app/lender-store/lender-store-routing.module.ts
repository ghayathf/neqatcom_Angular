import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OfferComponent } from './offer/offer.component';
import { MyLoaneesComponent } from './my-loanees/my-loanees.component';
import { LoanRequestsComponent } from './loan-requests/loan-requests.component';
import { ManageMeetingsComponent } from './manage-meetings/manage-meetings.component';
import { PostponeRequestsComponent } from './postpone-requests/postpone-requests.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { MyFollowersComponent } from './my-followers/my-followers.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'createoffer',
    component: OfferComponent,
  },
  {
    path: 'Edit-Profile',
    component: EditProfileComponent,
  },
  {
    path: 'myClients',
    component: MyLoaneesComponent,
  },

  {
    path: 'loan-requests',
    component: LoanRequestsComponent,
  },
  {
    path: 'manage-meetings',
    component: ManageMeetingsComponent,
  },

  {
    path: 'postpone-requests',
    component: PostponeRequestsComponent,
  },
  {
    path: 'Testimonial',
    component: TestimonialComponent,
  },
  {
    path: 'SecurityEdit',
    component: ChangePassComponent,
  },
  {
    path: 'Followers',
    component: MyFollowersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LenderStoreRoutingModule {}
