import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Renderer2, Inject, TemplateRef } from '@angular/core';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { AuthGuard } from 'src/app/auth.guard';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AnyObject } from 'chart.js/types/basic';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Time } from '@angular/common';
import * as L from 'leaflet';
import jwt_decode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { NotificationsService } from 'src/app/notifications.service';
import { AbstractControl, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaneeService } from 'src/app/loanee.service';
import { Chart } from 'chart.js';
declare const zingchart: any;
// Chart.register(...registerables);
import Swal from 'sweetalert2'
import { PagesService } from 'src/app/pages.service';

declare const feed: any;


@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.css']
})

export class LoanRequestsComponent {
  chart!: Chart;
  // public map!: L.Map;
  // private marker!: L.Marker;
  @ViewChild('chartCanvas', { static: true }) chartCanvasRef!: ElementRef;
  @ViewChild('MapDialig') MapD: any;
  @ViewChild("ViewLoaneeDetials") ViewDetails: any;
  @ViewChild("DeleteRequest") Delete: any;
  @ViewChild("MeetingDialog") ManageMeeting: any;
  @ViewChild("OnlineMeetingDialog") OnlineMeeting: any;
  @ViewChild('F2fMeetingDialog', { static: true }) OnsiteMeeting!: TemplateRef<any>;
  LoaneeCreditScoreStatus: any;
  constructor(public pagesService: PagesService,private notification: NotificationsService, private renderer: Renderer2, public loanService: LoanService, public EmailService: EmailsService, public AuthGard: AuthGuard, private dialog: MatDialog, public loaneeMeetingService: LoaneeService) { }

  googleMapsUrl: any;
  loanRequests: any;
  user: any;
  lenderid?: any;


  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),
    })

  meetingurl22: any

  async ngOnInit() {

    this.user = localStorage.getItem('Lenderid');
    this.lenderid = this.user;
    console.log(this.user);
    this.loanService.GetAllRequestedLoans(this.lenderid, 0).then(() => {
      this.loanRequests = this.loanService.LaonRequests;


    });

  }
  async ngOnDestroy(){
    this.loanService.progressBarVisible = true;
  }

  m: any
  s: any
  async sendEmail(email: string, receiver: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,
      receivername: receiver,
      message: mess
    };

    await this.EmailService.SentEmail(emailParams);
  }

  selectedLoaneeMail: any
  selectedLoaneeFname: any
  selectedLoaneeLname: any
  selectedLoaneeuserid: any;
  selectedLoaneeid: any
  Loanid: any
  OpenManageMeetingDialog(email: any, fname: any, lanme: any, loanid: any, userid_: any, loaneeid: any) {
    this.selectedLoaneeMail = email;
    this.selectedLoaneeFname = fname;
    this.selectedLoaneeLname = lanme;
    this.selectedLoaneeuserid = userid_;
    this.Loanid = loanid;
    this.selectedLoaneeid = loaneeid;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '700px';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    this.dialog.open(this.ManageMeeting, dialogConfig)
  }
  Meetingtdate?: any
  stringDate: any
  Meetingtime?: Time
  meetingurl?: any

  async ManageOnlineMeeting() {
    // await this.generateZoomMeetingUrl();
    this.dialog.closeAll()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    await this.dialog.open(this.OnlineMeeting, dialogConfig);
  }

  MeetingForm = new FormGroup(
    {
      startdate: new FormControl('', [Validators.required, this.futureDateValidator]),
      meetingurl: new FormControl(''),
      meetingtime: new FormControl('', Validators.required),
      loaneeid: new FormControl(''),
      lenderid: new FormControl(''),
      loanid: new FormControl(''),
    }
  )


  get startdate(): FormControl {
    return this.MeetingForm.get('startdate') as FormControl;
  }
  lenderName: any
  lenderEmail: any
  stringdate: any
  link: any

  zoomApiKey = 'Ql6mVHrDSIGybWQ9LY72Qw';
  zoomApiSecret = 'xmDyOtv72tap4V3tgZX2sIZS1cVVkzlJBiPl';
  meetingLink: any;
  x: any
  async CreateOnlineMeeting() {
    this.lenderName = localStorage.getItem('lenderName');
    this.lenderEmail = localStorage.getItem('lenderEmail');
    await this.EmailService.getMeetings();

    try {
      const selectedDate = new Date(this.Meetingtdate);
      if (isNaN(selectedDate.getTime())) {
        throw new Error('Invalid date');
      }
      this.stringdate = selectedDate.toDateString();
      const dateParts = selectedDate.toDateString().split(' ');
      const day = dateParts[0];
      const day2 = dateParts[1];
      const month = dateParts[2];
      const year = dateParts[3];
      const formattedDate = `${day} ${day2} ${month} ${year}`;
      this.link = this.EmailService.startUrl;
      this.s = "Online Meeting Appointment";
      this.m = "We would like to inform you that a meeting has been organized between you and " + this.lenderName + " on " + formattedDate + " at " + this.Meetingtime + " To make an agreement regarding the loan that you applied for, Join the meeting on this link: " + this.link.join_url;
      await this.sendEmail(this.selectedLoaneeMail, this.selectedLoaneeFname, this.m, this.s);

      this.CreateNotificationForm.controls['userid'].setValue(this.AuthGard.userId);
      this.CreateNotificationForm.controls['notificationsmessage'].setValue("New Online Meeting");
      await this.notification.CreateNotification(this.CreateNotificationForm.value);

      this.s = "Online Meeting Appointment";
      this.m = "We would like to point out that you have organized an online meeting on " + formattedDate + " at " + this.Meetingtime + " with the customer " + this.selectedLoaneeFname + " " + this.selectedLoaneeLname + " To make an agreement regarding the loan that this loanee applied for, Join the meeting on this link: " + this.link.join_url;
      await this.sendEmail(this.lenderEmail, this.lenderName, this.m, this.s);
      this.CreateNotificationForm.controls['userid'].setValue(this.selectedLoaneeuserid);
      this.CreateNotificationForm.controls['notificationsmessage'].setValue("New Online Meeting");

      this.MeetingForm.controls['meetingurl'].setValue(this.link.join_url);
      this.MeetingForm.controls['loanid'].setValue(this.Loanid);
      this.MeetingForm.controls['loaneeid'].setValue(this.selectedLoaneeid);
      this.x = localStorage.getItem('Lenderid');
      this.MeetingForm.controls['lenderid'].setValue(this.x);

      await this.notification.CreateNotification(this.CreateNotificationForm.value);
      await this.loanService.updateLoanStatus(this.Loanid, 1);
      await this.loaneeMeetingService.CreateMeeting(this.MeetingForm.value);
      await this.ngOnInit();
    } catch (error) {
      console.error(error);
      // Handle the error accordingly
    }
    this.dialog.closeAll();
await this.ngOnInit()
  }




  async ManageFaceToFaceMeeting() {
    this.dialog.closeAll()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '250vh';
    dialogConfig.maxHeight = '104vh';
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    const dialogRef = this.dialog.open(this.OnsiteMeeting, dialogConfig);
    await this.EmailService.openmap()


  }

  async CreateOnsilteMeeting() {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.EmailService.lat},${this.EmailService.lng}`;

    this.lenderName = localStorage.getItem('lenderName');
    this.lenderEmail = localStorage.getItem('lenderEmail');

    const selectedDate = new Date(this.Meetingtdate);
    const formattedDate = selectedDate.toDateString();

    this.s = "Face to face Meeting Appointment";
    this.m = "We would like to inform you that a meeting has been organized between you and " + this.lenderName + " on " + formattedDate + " at " + this.Meetingtime + " To make an agreement regarding the loan that you applied for, Be On time at " + googleMapsUrl;
    await this.sendEmail(this.selectedLoaneeMail, this.selectedLoaneeFname, this.m, this.s);

    this.CreateNotificationForm.controls['userid'].setValue(this.AuthGard.userId);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("New Onsite Meeting");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);

    this.s = "Face to face Meeting Appointment";
    this.m = "We would like to inform you that a meeting has been organized between you and " + this.lenderName + " on " + formattedDate + " at " + this.Meetingtime + " To make an agreement regarding the loan that you applied for, Be On time at " + googleMapsUrl;
    await this.sendEmail(this.lenderEmail, this.lenderName, this.m, this.s);

    this.CreateNotificationForm.controls['userid'].setValue(this.selectedLoaneeuserid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("New Onsite Meeting");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);

    this.MeetingForm.controls['meetingurl'].setValue(googleMapsUrl);
    this.MeetingForm.controls['loanid'].setValue(this.Loanid);
    this.MeetingForm.controls['loaneeid'].setValue(this.selectedLoaneeid);
    this.x = localStorage.getItem('Lenderid');
    this.MeetingForm.controls['lenderid'].setValue(this.x);

    await this.loanService.updateLoanStatus(this.Loanid, 1);
    await this.loaneeMeetingService.CreateMeeting(this.MeetingForm.value);
    this.dialog.closeAll();
    await this.ngOnInit()  }

  LoaneeImage: any
  LoaneeEmail: any
  LoaneeFname: any
  LoaneeLname: any
  LoaneeCredit: any
  Loaneeaddress: any
  Loaneephone: any
  LoaneeBirth: any
  async OpenAccountInfo(loaneeid:any,loaneeimg: any, email: any, fname: any, lanem: any, credit: any, address: any, phone: any, birth: any) {
    this.LoaneeImage = loaneeimg;
    this.LoaneeEmail = email;
    this.LoaneeFname = fname;
    this.LoaneeLname = lanem;
    this.Loaneeaddress = address;
    this.Loaneephone = phone;
    this.LoaneeCredit = credit;
    this.LoaneeBirth = birth;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';

    console.log(this.LoaneeCredit);
    const dialogRef = this.dialog.open(this.ViewDetails, dialogConfig);

    dialogRef.afterOpened().subscribe(() => {
    const myConfig = {
      type: 'gauge',
      globals: {
        fontSize: 10
      },
      plotarea: {
        marginTop: 80
      },
      plot: {
        size: '100%',
        valueBox: {
          placement: 'center',
          text: '%v',
          fontSize: 10,
          rules: [
            {
              rule: '%v >= 8',
              text: 'High'
            },
            {
              rule: '%v >= 4 && %v < 8',
              text: 'Medium'
            },
            {
              rule: '%v < 4',
              text: 'Low'
            }
          ]
        }
      },
      backgroundColor: 'transparent',
      tooltip: {
        borderRadius: 5
      },
      scaleR: {
        aperture: 180,
        minValue: 0,
        maxValue: 10,
        step: 1,
        center: {
          visible: false
        },
        tick: {
          visible: false
        },
        item: {
          offsetR: 0,
          rules: [
            {
              rule: '%i == 9',
              offsetX: 15
            }
          ]
        },
        labels: ['0', '', '', '', '', '', '', '', '', '', '10'],
        ring: {
          size: 15,
          rules: [
            {
              rule: '%v <= 3',
              backgroundColor: 'red'
            },
            {
              rule: '%v > 3 && %v <= 7',
              backgroundColor: 'yellow'
            },
            {
              rule: '%v >= 8',
              backgroundColor: 'green'
            }
          ]
        }
      },
      refresh: {
        type: 'feed',
        transport: 'js',
        url: 'feed()',
        interval: 1500,
        resetTimeout: 1000
      },
      series: [
        {
          values: [credit],
          backgroundColor: 'white',
          indicator: [10, 10, 10, 10, 0.75],
          animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 900
          }
        }
      ]
    };


    zingchart.render({
      id: 'myChart',
      data: myConfig,
      height: 250,
      width: '100%'
    });
  });
  this.pagesService.CreditScoreStatus(loaneeid);
  this.LoaneeCreditScoreStatus = this.pagesService.LoaneeCreditStatus[0];
  // const dialogRef = this.dialog.open(this.ViewDetails, dialogConfig);
  }

  selectedItem = 0
  first_name: any
  Email: any
 async openDeleteDialog(loanid: any, firstname: any, email: any) {
    this.first_name = firstname
    this.Email = email
    this.selectedItem = loanid
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    this.dialog.open(this.Delete, dialogConfig)



    Swal.fire({
      title: '<h1 style="color: white;">Rejecting?</h1>',
      html: '<span style="color: white;">Would you like to reject this Loan Request?</span>',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm-button',
        cancelButton: 'swal-custom-cancel-button',
      }, confirmButtonColor: '#DD5353',
      background: '#3e3e40',
    }).then((result) => {
      if (result.isConfirmed) {
        // DeleteOffer() logic goes here
        this.DeleteLoan();
      } else {
        this.dialog.closeAll();
      }
    });
    this.dialog.closeAll();
    await this.ngOnInit()

  }

  async DeleteLoan() {
    this.s = "Rejected Request"
    this.m = "We are sorry to let you know that your Loan request in Neqatcom has been rejected!"
    await this.loanService.deleteLoan(this.selectedItem)
    await this.sendEmail(this.Email, this.first_name, this.m, this.s);

    this.dialog.closeAll();
    await this.ngOnInit()  }

  futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate <= currentDate) {
      return { futureDateInvalid: true };
    }

    return null;
  }
  async selectLoaction() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    await this.dialog.open(this.MapD, dialogConfig);
  }


  updateChartValue(value: number) {
    this.chart.data.datasets[0].data = [value];
    this.chart.update();
  }

}


