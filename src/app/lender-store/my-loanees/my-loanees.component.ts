import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmailsService } from 'src/app/emails.service';
import { LenderStoreService } from 'src/app/lender-store.service';
import { NotificationsService } from 'src/app/notifications.service';
import { PurchasingService } from 'src/app/purchasing.service';
import { Chart } from 'chart.js';
import { PagesService } from 'src/app/pages.service';
declare const zingchart: any;
@Component({
  selector: 'app-my-loanees',
  templateUrl: './my-loanees.component.html',
  styleUrls: ['./my-loanees.component.css'],
})
export class MyLoaneesComponent {
  LoaneeCreditScoreStatus: any;
  constructor(
    public pagesService: PagesService,
    public lenderService: LenderStoreService,
    public dialog: MatDialog,
    public purchasingService: PurchasingService,
    public EmailService: EmailsService,
    private notification: NotificationsService
  ) {}
  loanees: any;
  length: any;
  @ViewChild('DetailsForm') Details: any;
  @ViewChild('PaymentsForm') PaymentDetails: any;
  @ViewChild('LoaneeDetials') LoaneeDetials: any;
  @ViewChild('Report') Report: any;
  GiveComplaintForm = new FormGroup({
    compliantnotes: new FormControl('', Validators.required),
    // dateofcomplaints: new FormControl('', Validators.required),
    loid: new FormControl('', Validators.required),
    leid: new FormControl('', Validators.required),
  });

  selectedLendId: any;
  selectedLoaneId: any;
  OpenCreateDialog(lendid: any, loaId: any) {
    this.selectedLendId = localStorage.getItem('Lenderid');

    this.selectedLoaneId = loaId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '900px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Report, dialogConfig);
  }
  CreateComplaint() {
    this.GiveComplaintForm.patchValue({
      leid: this.selectedLendId,
    });
    this.GiveComplaintForm.patchValue({
      loid: this.selectedLoaneId,
    });
    this.lenderService.GiveComplaintForLoanee(this.GiveComplaintForm.value);
  }

  async ngOnInit() {
    await this.lenderService.GetAllLoaneesForLenderStore(
      localStorage.getItem('Lenderid')
    );
    this.loanees = this.lenderService.loaneesLender;
    this.length = this.loanees.length;
    // console.log(this.loanees);
  }
  async ngOnDestroy() {
    this.lenderService.progressBarVisible = true;
  }

  loanss: any;
  loaneeid: any;
  email: any;
  name: any;
  async openDetails(id: number) {
    this.loaneeid = id;
    this.email = this.loanees.find((x: any) => x.loaneeid === id)?.email;
    this.name = this.loanees.find((x: any) => x.loaneeid === id)?.firstname;

    await this.lenderService.GetAllGetAllLoanOffer(
      localStorage.getItem('Lenderid'),
      id
    );
    this.loanss = await this.lenderService.loansoffer;
    const dialogConfig = new MatDialogConfig();
    console.log(this.loanss);
    dialogConfig.maxWidth = '1200px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    await this.dialog.open(this.Details, dialogConfig);
  }

  userid: any;
  loanid: any;
  flag = true;
  payments: any = [];
  async OpenPaymentsDialog(id: number, status: any, userid_: any) {
    //to save loan id for cash payment
    this.loanid = id;
    if (status == 4) {
      this.flag = false;
    }

    await this.purchasingService.GetAllPaymentsById(id);
    this.payments = await this.purchasingService.Payments;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1000px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.userid = userid_;
    await this.dialog.open(this.PaymentDetails, dialogConfig);
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
  m: any;
  s: any;

  PaymentType = PaymentType;

  async forgiveLoanee() {
    this.purchasingService.ForgiveLoanee(this.loanid);
    this.s = 'Forgivnes';
    this.m =
      'We want to inform you that you have been forgiven from paying the monthly installment for this month';
    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue(
      'New Forgiven Payment'
    );
    await this.sendEmail(this.email, this.name, this.m, this.s);
    await this.notification.CreateNotification(
      this.CreateNotificationForm.value
    );
    this.dialog.closeAll();
    await this.ngOnInit();
  }
  async PayCash() {
    this.purchasingService.PayCash(this.loanid);
    this.s = 'Pay Cash';
    this.m =
      'We want to inform you that you have been Payed from out site by cash payment..Thank you for visit us :)';
    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue(
      'New Cash Payment'
    );

    await this.sendEmail(this.email, this.name, this.m, this.s);
    await this.notification.CreateNotification(
      this.CreateNotificationForm.value
    );
    this.dialog.closeAll();
    await this.ngOnInit();
  }

  CreateNotificationForm = new FormGroup({
    userid: new FormControl(''),
    notificationsmessage: new FormControl(''),
  });

  loaneeImg: any;
  loaneeEmail: any;
  creditScore: any;
  postponecounter: any;
  fname: any;
  lname: any;
  address: any;
  Pnumber: any;
  async viewLoaneeDetials(
    userimage: any,
    email: any,
    creditscore: any,
    postponecounter: any,
    userid_: any,
    firstname: any,
    lastname: any,
    address: any,
    phonenumber: any,
    loaneeid: any
  ) {
    this.loaneeImg = userimage;
    this.loaneeEmail = email;
    this.userid = userid_;
    this.creditScore = creditscore;
    this.fname = firstname;
    this.lname = lastname;
    this.address = address;
    this.Pnumber = phonenumber;
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.maxWidth = '3%';
    // dialogConfig.maxHeight = '80vh';
    this.postponecounter = postponecounter;
    // await this.dialog.open(this.LoaneeDetials);
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.postponecounter = postponecounter;
    const dialogRef = this.dialog.open(this.LoaneeDetials, dialogConfig);
    dialogRef.afterOpened().subscribe(() => {
      const myConfig = {
        type: 'gauge',
        globals: {
          fontSize: 10,
        },
        plotarea: {
          marginTop: 80,
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
                text: 'High',
              },
              {
                rule: '%v >= 4 && %v < 8',
                text: 'Medium',
              },
              {
                rule: '%v < 4',
                text: 'Low',
              },
            ],
          },
        },
        backgroundColor: 'transparent',
        tooltip: {
          borderRadius: 5,
        },
        scaleR: {
          aperture: 180,
          minValue: 0,
          maxValue: 10,
          step: 1,
          center: {
            visible: false,
          },
          tick: {
            visible: false,
          },
          item: {
            offsetR: 0,
            rules: [
              {
                rule: '%i == 9',
                offsetX: 15,
              },
            ],
          },
          labels: ['0', '', '', '', '', '', '', '', '', '', '10'],
          ring: {
            size: 15,
            rules: [
              {
                rule: '%v <= 3',
                backgroundColor: 'red',
              },
              {
                rule: '%v > 3 && %v <= 7',
                backgroundColor: 'yellow',
              },
              {
                rule: '%v >= 8',
                backgroundColor: 'green',
              },
            ],
          },
        },
        refresh: {
          type: 'feed',
          transport: 'js',
          url: 'feed()',
          interval: 1500,
          resetTimeout: 1000,
        },
        series: [
          {
            values: [creditscore],
            backgroundColor: 'black',
            indicator: [10, 10, 10, 10, 0.75],
            animation: {
              effect: 2,
              method: 1,
              sequence: 4,
              speed: 900,
            },
          },
        ],
      };

      zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: 250,
        width: '100%',
      });
    });

    await this.pagesService.CreditScoreStatus(loaneeid);

    this.LoaneeCreditScoreStatus = this.pagesService.LoaneeCreditStatus[0];
  }
  get compliant(): FormControl {
    return this.GiveComplaintForm.get('compliantnotes') as FormControl;
  }
}

enum PaymentType {
  Cash = 1,
  Online = 2,
  Forgive = 3,
  Postponed = 5,
}
