import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from "../shared/shared.module";
import { LenderStoreRequestComponent } from './lender-store-request/lender-store-request.component';
import { AllLoaneesComponent } from './all-loanees/all-loanees.component';
import { ManageLoaneeComplaintsComponent } from './manage-loanee-complaints/manage-loanee-complaints.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { NgChartsModule } from 'ng2-charts';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageLenderComplaintsComponent } from './manage-lender-complaints/manage-lender-complaints.component';

@NgModule({
    declarations: [
        MainComponent,
        AllLoaneesComponent,
        LenderStoreRequestComponent,
        ManageLoaneeComplaintsComponent,
        ProfileComponent,
        ContactMessagesComponent,
        EditHomeComponent,
        CategoriesComponent,
        TestimonialsComponent,
        ChangePasswordComponent,
        ManageLenderComplaintsComponent

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        NgChartsModule
    ]
})
export class AdminModule { }
