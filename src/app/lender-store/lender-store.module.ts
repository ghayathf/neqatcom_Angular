import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LenderStoreRoutingModule } from './lender-store-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { OfferComponent } from './offer/offer.component';
import { ProfileComponent } from './profile/profile.component';
import { MyLoaneesComponent } from './my-loanees/my-loanees.component';
import { LoanRequestsComponent } from './loan-requests/loan-requests.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ManageMeetingsComponent } from './manage-meetings/manage-meetings.component';
import { PostponeRequestsComponent } from './postpone-requests/postpone-requests.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgChartsModule } from 'ng2-charts';

import { TestimonialComponent } from './testimonial/testimonial.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { MyFollowersComponent } from './my-followers/my-followers.component';
// import { GaugeChartModule } from 'angular-gauge-chart'

@NgModule({
  declarations: [
    MainComponent,
    OfferComponent,
    ProfileComponent,
    MyLoaneesComponent,
    LoanRequestsComponent,
    ManageMeetingsComponent,
    PostponeRequestsComponent,
    EditProfileComponent,
    TestimonialComponent,
    ChangePassComponent,
    MyFollowersComponent,
    
  ],
  imports: [
    CommonModule,
    LenderStoreRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbDropdownModule,
    NgChartsModule,
    NgbDropdownModule,
  ] 
})
export class LenderStoreModule { }
