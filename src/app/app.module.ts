import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationRoutingModule } from './authentication/authentication-routing.module';
import { AdminModule } from './admin/admin.module';
import { NgChartsModule } from 'ng2-charts';

import { LoaneeModule } from './loanee/loanee.module';
import { SharedModule } from './shared/shared.module';
import { LenderStoreModule } from './lender-store/lender-store.module';
import { ProgressBarModule } from 'primeng/progressbar';
// import { TestzoomComponent } from './lender/testzoom/testzoom.component';

@NgModule({
  declarations: [
    AppComponent,
    // TestzoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot(),
    AdminRoutingModule,
    AuthenticationRoutingModule,
    AdminModule,
    AuthenticationModule,
    NgChartsModule,
    LenderStoreModule,
    LoaneeModule,
    ProgressBarModule,
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: setVariable,
    //   multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
