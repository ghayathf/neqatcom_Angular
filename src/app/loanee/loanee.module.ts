import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaneeRoutingModule } from './loanee-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyloansComponent } from './myloans/myloans.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ConfirmLoansComponent } from './confirm-loans/confirm-loans.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import {
  JoyrideBackdropService,
  JoyrideModule,
  JoyrideService,
  JoyrideStepService,
} from 'ngx-joyride';
import { DocumentService } from 'ngx-joyride';
import { DomRefService } from 'ngx-joyride';
import { JoyrideOptionsService } from 'ngx-joyride';
import { EventListenerService } from 'ngx-joyride';
import { JoyrideStepsContainerService } from 'ngx-joyride';
import { LoggerService } from 'ngx-joyride';
import { StepDrawerService } from 'ngx-joyride';
@NgModule({
  declarations: [
    MainComponent,
    EditProfileComponent,
    SearchComponent,
    ChangePasswordComponent,
    MyloansComponent,
    ProgressbarComponent,
    ConfirmLoansComponent,
    TestimonialComponent,
  ],
  imports: [
    CommonModule,
    LoaneeRoutingModule,
    SharedModule,
    MatProgressBarModule,
    NgbModule,
    JoyrideModule.forRoot(),
  ],
  providers: [
    JoyrideService,
    JoyrideStepService,
    JoyrideBackdropService,
    DocumentService,
    DomRefService,
    JoyrideOptionsService,
    EventListenerService,
    JoyrideStepsContainerService,
    LoggerService,
    StepDrawerService,
  ],
})
export class LoaneeModule {}
