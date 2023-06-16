import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmailsService } from 'src/app/emails.service';
import { render } from 'creditcardpayments/creditCardPayments'
import { LoaneeService } from 'src/app/loanee.service';
import { OfferService } from 'src/app/offer.service';
import { PurchasingService } from 'src/app/purchasing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoanService } from 'src/app/loan.service';
import { Toast } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';
import { JoyrideService }from 'ngx-joyride';
@Component({
  selector: 'app-myloans',
  templateUrl: './myloans.component.html',
  styleUrls: ['./myloans.component.css']
})

export class MyloansComponent implements OnInit {

  paypalButton: ElementRef<any> | undefined;
  constructor(public joyride: JoyrideService,public EmailService: EmailsService, public email: EmailsService, private dialog: MatDialog, public loaneesService: LoaneeService, public purchasingService: PurchasingService, public loanService: LoanService,
    public loaneeService: LoaneeService) {
  }

  @ViewChild('Payments') Payments: any
  @ViewChild('Report') Report: any
  @ViewChild('Postpone') postpone: any
  @ViewChild('CancelLoan') CancelLoan: any

  @ViewChild("ViewLoanDetails") Details: any
  @ViewChild("Confirm") Confirm: any
  @ViewChild("Reject") Reject: any
  @ViewChild("Feedback") FeedBackDialog: any
  ConfirmationLoans: any
  loaneeid: any
  feedbackk: any = 0;
  getPercentage(max: number, min: number): number {
    let res = min * 1 / max * 100
    return res;
  }

  GiveComplaintForm = new FormGroup(
    {
      compliantnotes: new FormControl('', Validators.required),
      // dateofcomplaints: new FormControl('', Validators.required),
      loid: new FormControl('', Validators.required),
      leid: new FormControl('', Validators.required)
    }
  )
  get compliant(): FormControl {
    return this.GiveComplaintForm.get("compliantnotes") as FormControl;
  }


  SelectedLoanID: any
  SelectedLenderID: any
  SelectedFirstName: any
  SelectedEmail: any
  m: any
  s: any
  CancelSelectedLoan(loanID: any, LenderID: any, FirstName: any, email: any) {
    this.SelectedLoanID = loanID;
    this.SelectedLenderID = LenderID;
    this.SelectedFirstName = FirstName;
    this.SelectedEmail = email;
    this.s = "Loan Request Cancelation"
    this.m = "To inform you that the loan #" + this.SelectedLoanID + " has been rejected by the loanee."

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.maxWidth = '800px';
    // dialogConfig.maxHeight = '80vh';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.CancelLoan, dialogConfig);



    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">Do you want to delete this loan request?</span>',
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
        this.RequestCancelation();
      } else {
        this.dialog.closeAll();
      }
    });



  }
  async RequestCancelation() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.loanService.deleteLoan(this.SelectedLoanID);
    await this.sendEmail(this.SelectedEmail, this.SelectedFirstName, this.m, this.s);
    this.dialog.closeAll();
await this.ngOnInit()
  }
  async sendEmail(email: string, receiver: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,
      receivername: receiver,
      message: mess
    };

    await this.EmailService.SentEmail(emailParams);
  }
  selectedLendId: any
  selectedLoaneId: any
  name: any
  OpenCreateDialog(lendid: any, loaId: any, name: any) {
    this.name = name
    this.selectedLendId = lendid
    this.selectedLoaneId = loaId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '600px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Report, dialogConfig)
  }

  async CreateComplaint() {
    this.GiveComplaintForm.patchValue({
      leid: this.selectedLendId
    });
    this.GiveComplaintForm.patchValue({
      loid: this.selectedLoaneId
    });
    this.loaneesService.GiveComplaintForLender(this.GiveComplaintForm.value)
    this.dialog.closeAll();
await this.ngOnInit()
  }
  Stat = Stat;
  PaymentType = PaymentType;
  loans: any
  async ngOnInit() {

    console.log(localStorage.getItem("Loaneeid"))
    await this.loaneesService.GetCurrentAndFinishedLoans(localStorage.getItem("Loaneeid"))
    this.loans = this.loaneesService.CurrentAndFinishedLoans
    console.log(this.loaneesService.CurrentAndFinishedLoans);
    const loaneeid = await localStorage.getItem('LoaneeID')
    if (loaneeid != null) {
      this.loaneeid = parseInt(loaneeid)
    }
    await this.loaneeService.GetConfirmLoans(this.loaneeid)
    this.ConfirmationLoans = this.loaneeService.LoansConfirmation
    console.log(this.loans)
    console.log(parseInt(this.loaneeid));
// this.tour()
  }
  tour(){
    this.joyride.startTour(
      { steps: [
       'thirdstep',
      'reportstep',
      'paymentstep',
    'postponestep',
'canclestep',
'confrimstep',
'cancleLoanformstep']}
    )
  }
  selectedloan: any
  AllPayments: any
  flag: any
  monthly: any
  est: any
  ffflagcompleted: any
  ffflagprogeress: any

  async ShowPaymentsDialog(loanid: any, ba: any, status: any) {
    this.selectedloan = loanid;
    if (status == 4) {
      this.ffflagcompleted = true
      this.ffflagprogeress = false
    }
    else {
      this.ffflagcompleted = false
      this.ffflagprogeress = true
    }
    await this.loanService.GetLoanById(loanid);
    this.monthly = await this.loanService.monthly
    await setTimeout(() => {
      this.paypalButton = new ElementRef(document.querySelector('#myPaypalButtons'));
      render({
        id: "#myPaypalButtons",
        currency: "USD",
        value: this.monthly,
        onApprove: async (details) => {
          alert("Transaction Successful");
          await this.purchasingService.PayOnline(loanid);
        }
      });
    }, 1000);

    await this.purchasingService.GetAllPaymentsById(loanid);
    this.AllPayments = this.purchasingService.Payments;
    this.flag = this.purchasingService.flag;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1000vh';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Payments, dialogConfig);
  }

  loaneeID: any
  loanID: any
  RequestPostponeDialog(loanid: any, loaneeid: any) {
    this.loanID = loanid
    this.loaneeID = loaneeid;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.postpone, dialogConfig);





    Swal.fire({
      title: '<h1 style="color: white;">Requesting</h1>',
      html: '<span style="color: white;">Request Postpone for this Loan ?</span>',

      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm-button',
        cancelButton: 'swal-custom-cancel-button',
      }, confirmButtonColor: '#87adbd',
      background: '#3e3e40',
    }).then((result) => {
      if (result.isConfirmed) {
        // DeleteOffer() logic goes here
        this.RequestPostpone();
      } else {
        this.dialog.closeAll();
      }
    });
  }
  async RequestPostpone() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.loanService.updatePostponeStatus(this.loanID, 1, this.loaneeID)
    this.dialog.closeAll();
    await this.ngOnInit()

  }
  MakePDF() {
    let pdf = new jsPDF();


    // pdf.addImage(imgData, 'JPEG', 15, 20, 30, 30)
    //  pdf.text('Paranyan loves jsPDF', 35, 25)

    autoTable(pdf, { html: "#excel-table" });

    pdf.save("emp.pdf");

  }

  lenderEmail: any
  lenderName: any
  monthlyAmount: any
  startDate: any
  EndDate: any
  loanId: any
  meetingID: any
  openConfirmDialog(email: any, firstname: any, monthlyamount: any, startdate: any, enddate: any, loanid: any, meetingID: any) {
    this.lenderEmail = email
    this.lenderName = firstname
    this.monthlyAmount = monthlyamount
    this.startDate = startdate
    this.EndDate = enddate
    this.loanId = loanid
    this.meetingID = meetingID
    console.log(this.loanId)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Confirm, dialogConfig);




  }

  openRejectDialog(email: any, firstname: any, loanid: any, meetingid: any) {
    this.lenderEmail = email
    this.lenderName = firstname
    this.loanId = loanid
    this.meetingID = meetingid
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Reject, dialogConfig)
  }
  OpenConfirm(email: any, firstname: any, loanid: any, meetingid: any) {
    this.lenderEmail = email
    this.lenderName = firstname
    this.loanId = loanid
    this.meetingID = meetingid
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Confirm, dialogConfig)
  }
  loaneefName = localStorage.getItem('LoaneeName')
  loaneeLName = localStorage.getItem('LoaneeLastName')
  async RejectLoan() {
    this.s = "Cancle Loan"
    this.m = "We would like to inform you that " + this.loaneefName + " " + this.loaneeLName + " cancled the loan!"
    await this.loanService.deleteLoan(this.loanId)
    await this.sendEmail(this.lenderEmail, this.lenderName, this.m, this.s);
     
    this.dialog.closeAll();
await this.ngOnInit()
  }
  async ConfirmLoan() {
    this.s = "Confirm Loan"
    this.m = "We would like to inform you that " + this.loaneefName + " " + this.loaneeLName + " confirm the loan!"
    await this.loanService.updateLoanStatus(this.loanId, 3)
    await this.sendEmail(this.lenderEmail, this.lenderName, this.m, this.s);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.FeedBackDialog, dialogConfig);
    this.dialog.closeAll();
await this.ngOnInit()
  }
  async Givefeedback(feedback: any) {
    await this.loaneeService.GiveRateForLender(this.meetingID, feedback);
    this.dialog.closeAll();
await this.ngOnInit()
     
  }

  startTour()
  {
    this.tour()
  }
}
enum Stat {
  Pending = 0,
  Meeting = 1,
  WaitingForConfirm = 2,
  InProgress = 3,
  Completed = 4
}
enum PaymentType {
  Cash = 1,
  Online = 2,
  Forgive = 3,
  Postponed = 5

}
