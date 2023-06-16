import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminSideBarComponent } from './admin-side-bar/admin-side-bar.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LenderSideBarComponent } from './lender-side-bar/lender-side-bar.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoaneeheaderComponent } from './loaneeheader/loaneeheader.component';
import { LoaneefooterComponent } from './loaneefooter/loaneefooter.component';
import { LenderFooterComponent } from './lender-footer/lender-footer.component';
import { LenderHeaderComponent } from './lender-header/lender-header.component';
import { LenderBannerComponent } from './lender-banner/lender-banner.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { PhotomodalComponent } from './photomodal/photomodal.component';
import { JoyrideBackdropService, JoyrideModule, JoyrideService, JoyrideStepService } from 'ngx-joyride';
import { DocumentService } from 'ngx-joyride';
import { DomRefService } from 'ngx-joyride';
import { JoyrideOptionsService } from 'ngx-joyride';
import { EventListenerService } from 'ngx-joyride';
import { JoyrideStepsContainerService } from 'ngx-joyride';
import { LoggerService } from 'ngx-joyride';
import { StepDrawerService } from 'ngx-joyride';
@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSideBarComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    LenderSideBarComponent,
    LoaneefooterComponent,
    LoaneeheaderComponent,
    LenderFooterComponent,
    LenderHeaderComponent,
    LenderBannerComponent,
    PhotomodalComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxCaptchaModule,
    NgbDropdownModule,
    MatDatepickerModule,
    MatSelectModule,


  ],
  exports: [
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSideBarComponent,
    HomeFooterComponent,
    LenderSideBarComponent,
    HomeHeaderComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxSpinnerModule,
    MatDialogModule,
    NgxCaptchaModule,
    LoaneefooterComponent,
    LoaneeheaderComponent,
    NgbDropdownModule,
    LenderFooterComponent,
    LenderHeaderComponent,
    LenderBannerComponent,
    MatDatepickerModule,
    MatSelectModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [JoyrideService,
    JoyrideStepService,
    JoyrideBackdropService,
    DocumentService,
    DomRefService,
    JoyrideOptionsService,
    EventListenerService,
    JoyrideStepsContainerService,
    LoggerService,
    StepDrawerService]
})
export class SharedModule { }
