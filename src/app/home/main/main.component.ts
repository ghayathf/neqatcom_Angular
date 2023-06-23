import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { OfferService } from 'src/app/offer.service';
import { PagesService } from 'src/app/pages.service';
import { TestimonialsService } from 'src/app/testimonials.service';
import { Chart, registerables } from 'chart.js';
import { AdminService } from 'src/app/admin.service';
declare const feed: any;
declare const zingchart: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  chart!: Chart;
  constructor(
    public adminService: AdminService,
    private Testimonials: TestimonialsService,
    public offerService: OfferService,
    public pagesService: PagesService,
    public EmailService: EmailsService,
    public loanService: LoanService
  ) {}
  m: any;
  s: any;
  Accepted: any;
  Offers: any;
  async ngOnInit() {
    await this.Testimonials.GetAcceptedTestimonials();
    await this.offerService.GetRandomlyOffer();
    await this.pagesService.CalculateCreditScores();
    await this.pagesService.GetLoaneestoRemind();
    await this.pagesService.UpdateBeforeReminder();
    await this.adminService.CheckFiveDays();
    await this.pagesService.GetLoaneesInPayDaytoRemind();
    await this.pagesService.UpdateInPayDateReminder();
    await this.pagesService.GetLoaneeslatePayDaytoRemind();
    await this.pagesService.UpdateLatePayDateReminder();
    await this.pagesService.CancleLoanAutomatically();

    this.Accepted = this.Testimonials.AccetpedTestimonials;
    console.log(this.Accepted);

    this.Offers = this.offerService.Randomlyoffers;

    for (var i = 0; i < this.pagesService.BeforeReminder.length; i++) {
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
        'We would like to Remind you that  your Payment for this loan #' +
        this.pagesService.BeforeReminder[i].loanid +
        ' loan on  ' +
        formattedDate +
        ' with ' +
        this.pagesService.BeforeReminder[i].monthlyamount +
        " amount , Don't be late !";
      try {
        await this.sendEmail(
          this.pagesService.BeforeReminder[i].email,
          this.pagesService.BeforeReminder[i].firstname,
          this.m,
          this.s
        );
        console.log(this.pagesService.BeforeReminder[i].email);
      } catch {
        console.log('some error occure !');
      }
    }

    for (var i = 0; i < this.pagesService.InPayDayReminder.length; i++) {
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
        'We would like to Remind you that  your Payment for this loan #' +
        this.pagesService.InPayDayReminder[i].loanid +
        ' loan on  ' +
        formattedDate +
        ' with ' +
        this.pagesService.BeforeReminder[i].monthlyamount +
        " amount , Don't miss the appointment because it will affect on your creditscore !";
      try {
        await this.sendEmail(
          this.pagesService.InPayDayReminder[i].email,
          this.pagesService.InPayDayReminder[i].firstname,
          this.m,
          this.s
        );
        console.log(this.pagesService.InPayDayReminder[i].email);
      } catch {
        console.log('some error occure !');
      }
    }

    console.log(this.pagesService.LateDayReminder);
    const currentDate = new Date();

    // Check if it's 12 PM
    if (currentDate.getHours() === 12 && currentDate.getMinutes() === 0) {
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
          'Please note that your repayment date for this loan #' +
          this.pagesService.LateDayReminder[i].loanid +
          ' that was on ' +
          formattedDate +
          ' with ' +
          this.pagesService.LateDayReminder[i].monthlyamount +
          ' amount, has passed. Hurry up and pay it off!';
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
    }

    for (var i = 0; i < this.pagesService.CancleAuto.length; i++) {
      this.s = 'Automatic Loan Cancelation ';
      this.m =
        'Please note that this loan #' +
        this.pagesService.CancleAuto[i].loanid +
        ' has been canceled automatically from the system ';
      await this.sendEmail(
        this.pagesService.CancleAuto[i]?.email,
        this.pagesService.CancleAuto[i]?.firstname,
        this.m,
        this.s
      );
      await this.pagesService.deleteMeeting(
        this.pagesService.CancleAuto[i]?.meetingid
      );
      await this.loanService.deleteLoan(
        this.pagesService.CancleAuto[i]?.loanid
      );
    }
    await this.pagesService.CancleLoanAutoMsgForLender();
    for (var i = 0; i < this.pagesService.CancleAutoMsgLender.length; i++) {
      this.s = 'Automatic Loan Cancelation ';
      this.m =
        'Please note that this loan #' +
        this.pagesService.CancleAutoMsgLender[i].loanid +
        ' has been canceled automatically from the system ';
      await this.sendEmail(
        this.pagesService.CancleAutoMsgLender[i]?.email,
        this.pagesService.CancleAutoMsgLender[i]?.firstname,
        this.m,
        this.s
      );
    }
  }
  async ngOnDestroy() {
    this.pagesService.progressBarVisible = true;
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
  searchText: string = '';
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  updateChartValue(value: number) {
    this.chart.data.datasets[0].data = [value];
    this.chart.update();
  }
}
