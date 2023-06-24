import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { AdminService } from './admin.service';
import { TestimonialsService } from './testimonials.service';
import { OfferService } from './offer.service';
import { PagesService } from './pages.service';
import { EmailsService } from './emails.service';
import { LoanService } from './loan.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundServiceService {

  private alive = true;

  constructor(
    public adminService: AdminService,
    private Testimonials: TestimonialsService,
    public offerService: OfferService,
    public pagesService: PagesService,
    public EmailService: EmailsService,
    public loanService: LoanService,
  ) { }

  m: any;
  s: any;
  Accepted: any;
  Offers: any;

  startBackgroundTask(): void {
    interval(1000) // Change the interval as per your requirements
      .pipe(takeWhile(() => this.alive))
      .subscribe(async () => {
        // Place your code here that needs to be executed continuously
        console.log('Background task running...');

        await this.pagesService.CalculateCreditScores();
        await this.adminService.CheckFiveDays();
        await this.pagesService.CancleLoanAutomatically();
        const currentDate = new Date();

        this.Offers = this.offerService.Randomlyoffers;

        if (
          currentDate.getHours() === 10 &&
          currentDate.getMinutes() >= 0 &&
          currentDate.getMinutes() <= 59 &&
          localStorage.getItem('reminderDate') !== new Date().toLocaleDateString()
        ) {
          localStorage.setItem('reminderDate', new Date().toLocaleDateString());
          await this.pagesService.GetLoaneestoRemind();

          for (let i = 0; i < this.pagesService.BeforeReminder.length; i++) {
            console.log(new Date());
            const date = new Date(this.pagesService.BeforeReminder[i].startdate);
            const DD = new Date(date);
            const day = DD.toLocaleString('default', { weekday: 'long' });
            const dayOfMonth = DD.getDate();
            const month = DD.toLocaleString('default', { month: 'long' });
            const year = DD.getFullYear();
            const formattedDate = `${day} ${dayOfMonth} ${month} ${year}`;
            this.s = 'Reminder Payment Email';
            this.m =
              'We would like to remind you that your payment for loan #' +
              this.pagesService.BeforeReminder[i].loanid +
              ' loan on ' +
              formattedDate +
              ' with ' +
              this.pagesService.BeforeReminder[i].monthlyamount +
              ' amount, don\'t be late!';
            try {
              await this.sendEmail(
                this.pagesService.BeforeReminder[i].email,
                this.pagesService.BeforeReminder[i].firstname,
                this.m,
                this.s
              );
              console.log(this.pagesService.BeforeReminder[i].email);
            } catch {
              console.log('Some error occurred!');
            }
          }

          await this.pagesService.UpdateBeforeReminder();
        }

        if (
          currentDate.getHours() === 10 &&
          currentDate.getMinutes() >= 0 &&
          currentDate.getMinutes() <= 59 &&
          localStorage.getItem('reminderDate') !== new Date().toLocaleDateString()
        ) {
          localStorage.setItem('reminderDate', new Date().toLocaleDateString());
          await this.pagesService.GetLoaneesInPayDaytoRemind();

          for (let i = 0; i < this.pagesService.InPayDayReminder.length; i++) {
            console.log(new Date());
            const date = new Date(this.pagesService.InPayDayReminder[i].startdate);
            const DD = new Date(date);
            const day = DD.toLocaleString('default', { weekday: 'long' });
            const dayOfMonth = DD.getDate();
            const month = DD.toLocaleString('default', { month: 'long' });
            const year = DD.getFullYear();
            const formattedDate = `${day} ${dayOfMonth} ${month} ${year}`;
            this.s = 'Reminder Payment Email';
            this.m =
              'We would like to remind you that your payment for loan #' +
              this.pagesService.InPayDayReminder[i].loanid +
              ' loan on ' +
              formattedDate +
              ' with ' +
              this.pagesService.BeforeReminder[i].monthlyamount +
              ' amount, don\'t miss the appointment because it will affect your credit score!';
            try {
              await this.sendEmail(
                this.pagesService.InPayDayReminder[i].email,
                this.pagesService.InPayDayReminder[i].firstname,
                this.m,
                this.s
              );
              console.log(this.pagesService.InPayDayReminder[i].email);
            } catch {
              console.log('Some error occurred!');
            }
          }

          await this.pagesService.UpdateInPayDateReminder();
        }

        if (
          currentDate.getHours() === 10 &&
          currentDate.getMinutes() >= 0 &&
          currentDate.getMinutes() <= 59 &&
          localStorage.getItem('reminderDate') !== new Date().toLocaleDateString()
        ) {
          localStorage.setItem('reminderDate', new Date().toLocaleDateString());
          await this.pagesService.GetLoaneeslatePayDaytoRemind();

          for (let i = 0; i < this.pagesService.LateDayReminder.length; i++) {
            console.log(new Date());
            const date = new Date(this.pagesService.LateDayReminder[i].startdate);
            const DD = new Date(date);
            const day = DD.toLocaleString('default', { weekday: 'long' });
            const dayOfMonth = DD.getDate();
            const month = DD.toLocaleString('default', { month: 'long' });
            const year = DD.getFullYear();
            const formattedDate = `${day} ${dayOfMonth} ${month} ${year}`;
            this.s = 'Reminder Payment Email';
            this.m =
              'Please note that your repayment date for loan #' +
              this.pagesService.LateDayReminder[i].loanid +
              ' was on ' +
              formattedDate +
              ' with an amount of ' +
              this.pagesService.LateDayReminder[i].monthlyamount +
              '. Please make the payment as soon as possible!';
            try {
              await this.sendEmail(
                this.pagesService.LateDayReminder[i].email,
                this.pagesService.LateDayReminder[i].firstname,
                this.m,
                this.s
              );
              console.log(this.pagesService.LateDayReminder[i].email);
            } catch {
              console.log('Some error occurred!');
            }
          }

          await this.pagesService.UpdateLatePayDateReminder();
        }

        for (let i = 0; i < this.pagesService.CancleAuto.length; i++) {
          this.s = 'Automatic Loan Cancellation';
          this.m =
            'Please note that this loan #' +
            this.pagesService.CancleAuto[i].loanid +
            ' has been canceled automatically from the system';
          await this.sendEmail(
            this.pagesService.CancleAuto[i]?.email,
            this.pagesService.CancleAuto[i]?.firstname,
            this.m,
            this.s
          );
          await this.loanService.deleteLoan(
            this.pagesService.CancleAuto[i]?.loanid
          );
        }

        await this.pagesService.CancleLoanAutoMsgForLender();

        for (let i = 0; i < this.pagesService.CancleAutoMsgLender.length; i++) {
          this.s = 'Automatic Loan Cancellation';
          this.m =
            'Please note that this loan #' +
            this.pagesService.CancleAutoMsgLender[i].loanid +
            ' has been canceled automatically from the system';
          await this.sendEmail(
            this.pagesService.CancleAutoMsgLender[i]?.email,
            this.pagesService.CancleAutoMsgLender[i]?.firstname,
            this.m,
            this.s
          );
        }
      });
  }

  stopBackgroundTask(): void {
    this.alive = false;
  }

  async sendEmail(email: string, receiver: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,
      receivername: receiver,
      message: mess,
    };
    await this.EmailService.SentEmail(emailParams);
  }
}
