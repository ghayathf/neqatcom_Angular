import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthGuard } from 'src/app/auth.guard';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { addMonths, parseISO, format } from 'date-fns';
import { FormControl, FormGroup } from '@angular/forms';
import { PagesService } from 'src/app/pages.service';
import { NotificationsService } from 'src/app/notifications.service';
import { Chart } from 'chart.js';
declare const zingchart: any;import Swal from 'sweetalert2';

// import * as FusionCharts from 'fusioncharts';
// // import * as angularGauge from 'fusioncharts/fusioncharts.gauge';
// import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// import { FusionChartsModule } from 'angular-fusioncharts';

// FusionChartsModule.fcRoot(FusionCharts, FusionTheme);



@Component({
  selector: 'app-postpone-requests',
  templateUrl: './postpone-requests.component.html',
  styleUrls: ['./postpone-requests.component.css'],


})
export class PostponeRequestsComponent {
  @ViewChild("ViewLoaneeDetials") ViewDetails: any;
  @ViewChild("RejectPostpone") Reject: any;
  @ViewChild("AcceptPostpone") Accept: any;

  constructor(public loanService: LoanService, public EmailService: EmailsService, public AuthGard: AuthGuard, private dialog: MatDialog, public pagesService: PagesService, private notification: NotificationsService) { }
  postponeRequests: any = [];
  user: any;
  lenderid: any
  public canvasWidth = 200;
  needleValue: any;
  public centralLabel = '';
  public name = 'Gauge chart';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: ['red', 'yellow', 'green'],
    needleUpdateSpeed: 10,
    arcColors: ['red', 'yellow', 'green'],
    arcDelimiters: [0.175, 0.675, 1],
    rangeLabel: ['0', '10'], // Minimum value: 0, Maximum value: 10
    needleStartValue: 5,
  };



  // Update arcDelimiters
  // Update arcDelimiters


  async ngOnInit() {
    // this.user = localStorage.getItem('Lenderid');
    this.lenderid = await localStorage.getItem('Lenderid');
    console.log(this.lenderid);
    await this.loanService.GetAllRequestedPostpones(parseInt(this.lenderid), 1)
    //postpone status ---> 1 :pending
    //postpone status ---> -1 :reject
    //postpone status ---> 2 :accept
    this.postponeRequests = await this.loanService.PostponeRequests;
    console.log(this.postponeRequests)


  }


  LoaneeImage: any
  LoaneeEmail: any
  LoaneeFname: any
  LoaneeLname: any
  LoaneeCredit: any
  LoaneePostponeCounter: any
  Loaneeid: any
  LoaneeCreditScoreStatus: boolean = false;
  async OpenAccountInfo(loaneeimg: any, email: any, fname: any, lanem: any, credit: any, postponeCounter: any, loaneeid: any) {
    this.LoaneeImage = loaneeimg
    this.LoaneeEmail = email
    this.LoaneeFname = fname
    this.LoaneeLname = lanem
    this.LoaneeCredit = credit
    this.LoaneePostponeCounter = postponeCounter
    this.Loaneeid = loaneeid
    this.needleValue = credit;
    this.bottomLabel = this.needleValue.toString();



    // this.options.arcDelimiters = this.options.arcColors.map(
    //   (color: string, index: number): number => {
    //     return ((index + 1) * parseInt(this.options.rangeLabel[1])) / this.options.arcColors.length;
    //   }
    // );

    this.pagesService.CreditScoreStatus(this.Loaneeid);
    this.LoaneeCreditScoreStatus = this.pagesService.LoaneeCreditStatus[0];
    console.log(this.pagesService.LoaneeCreditStatus)
    const dialogConfig = new MatDialogConfig();
    //   dialogConfig.maxWidth = '600vh';
    //   dialogConfig.maxHeight = '100vh';
    //  await this.dialog.open(this.ViewDetails)
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    const dialogRef = this.dialog.open(this.ViewDetails, dialogConfig)
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
  }
  m: any
  s: any
  lenderName: any
  lenderEmail: any
  async sendEmail(email: string, receiver: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,
      receivername: receiver,
      message: mess
    };

    await this.EmailService.SentEmail(emailParams);
  }
  selectedItem: any
  first_name: any
  Email: any
  loaneeid: any
  userid: any;
  openRejectDialog(loanid: any, firstname: any, email: any, loaneeid: any, userid_: any) {
    this.selectedItem = loanid
    this.first_name = firstname
    this.Email = email
    this.loaneeid = loaneeid
    this.userid = userid_;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Reject)


    Swal.fire({
      title: '<h1 style="color: white;">Rejecting?</h1>',
      html: '<span style="color: white;">Would you like to Reject this Postpone Request ?</span>',
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
        this.RejectRequest();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),

    })
  async RejectRequest() {
    this.ngOnInit()
    this.dialog.closeAll();
    this.loanService.updatePostponeStatus(this.selectedItem, -1, this.loaneeid);
    this.lenderName = localStorage.getItem('lenderName')
    this.lenderEmail = localStorage.getItem('lenderEmail')

    this.s = "Rejected Postpone Request"
    this.m = "We are sorry to let you know that your Postpone request from " + this.lenderName + " in Neqatcom has been rejected!"
    await this.sendEmail(this.Email, this.first_name, this.m, this.s);
    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("Rejected Postpone Request");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);

    this.dialog.closeAll();
    await this.ngOnInit()

  }
  startDate: any
  openAcceptDialog(loanid: any, firstname: any, email: any, loaneeid: any, startdate: any, userid_: any) {
    this.selectedItem = loanid
    this.first_name = firstname
    this.Email = email
    this.loaneeid = loaneeid
    this.startDate = startdate
    this.userid = userid_;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Accept, dialogConfig)


    Swal.fire({
      title: '<h1 style="color: white;">Confirming?</h1>',
      html: '<span style="color: white;">Would you like to Accept this Postpone Request ?</span>',

      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm-button',
        cancelButton: 'swal-custom-cancel-button',
      }, confirmButtonColor: '#a5dc86',
      background: '#3e3e40',
    }).then((result) => {
      if (result.isConfirmed) {
        // DeleteOffer() logic goes here
        this.AcceptRequest();
      } else {                         
        this.dialog.closeAll();
      }
    });
  }
  newDate?: Date
  NewDateString: any
  async AcceptRequest() {
    this.ngOnInit()
    this.dialog.closeAll();
    const date = new Date(this.startDate)
    this.newDate = addMonths(date, 1);
    const DD = new Date(this.newDate);
    const day = DD.toLocaleString('default', { weekday: 'long' });
    const dayOfMonth = DD.getDate();
    const month = DD.toLocaleString('default', { month: 'long' });
    const year = DD.getFullYear();
    const formattedDate = `${day} ${dayOfMonth} ${month} ${year}`;
     
    //change postpone status from pending to reject
    this.loanService.updatePostponeStatus(this.selectedItem, 0, this.loaneeid);
    this.lenderName = localStorage.getItem('lenderName')
    this.lenderEmail = localStorage.getItem('lenderEmail')

    this.s = "Accept Postpone Request"
    this.m = "We would like to inform you that  your Postpone request from " + this.lenderName + " in Neqatcom has been Accepted! , Your Payment date should be on " + formattedDate
    await this.sendEmail(this.Email, this.first_name, this.m, this.s);
    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("Accept Postpone Request");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);
    this.dialog.closeAll();
    await this.ngOnInit()  }

}


