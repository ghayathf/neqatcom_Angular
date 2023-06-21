import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthGuard } from 'src/app/auth.guard';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaneeService } from 'src/app/loanee.service';
import { addMonths, parseISO, format } from 'date-fns';
import { NotificationsService } from 'src/app/notifications.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage-meetings',
  templateUrl: './manage-meetings.component.html',
  styleUrls: ['./manage-meetings.component.css']
})
export class ManageMeetingsComponent {
  @ViewChild("DeleteRequest") Delete: any;
  @ViewChild("FillForm") Fill: any;
  @ViewChild("MonthlyAmount") MonthlyAmount: any;
  constructor(private notification: NotificationsService, public loanService: LoanService, public EmailService: EmailsService, public AuthGard: AuthGuard, private dialog: MatDialog, public loaneeService: LoaneeService) { }
  loanMeeting: any;
  user: any;
  lenderid?: any;
  LoanForm = new FormGroup(
    {
      loanid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      startdate: new FormControl('', [Validators.required, this.checkDateValidator]),
      totalmonths: new FormControl('', Validators.required),
      totalprice: new FormControl('', Validators.required),
      monthlyamount: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required),
    }
  )



  get TotalPrice(): FormControl {
    return this.LoanForm.get('totalprice') as FormControl;
  }

  get TotalMonths(): FormControl {
    return this.LoanForm.get('totalmonths') as FormControl;
  }
  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),

    })
  async ngOnInit() {
    this.lenderid = localStorage.getItem('Lenderid')
    await this.loanService.GetAllRequestedLoans(this.lenderid, 1);
    this.loanMeeting = this.loanService.LaonRequests;
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
  selectedItem = 0
  first_name: any
  Email: any
  userid: any;
  openDeleteDialog(loanid: any, firstname: any, email: any, userid_: any) {
    this.first_name = firstname
    this.Email = email
    this.selectedItem = loanid
    this.userid = userid_;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Delete, dialogConfig)




    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">Cancel this loan before it starts?</span>',
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
  }
  async DeleteLoan() {

    this.ngOnInit()
    this.dialog.closeAll();

    this.s = "Rejected Request"
    this.m = "We are sorry to let you know that your Loan request in Neqatcom has been rejected!"
    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("Loan Request Rejected");
    await this.loanService.deleteLoan(this.selectedItem)
    await this.sendEmail(this.Email, this.first_name, this.m, this.s);
    await   this.notification.CreateNotification(this.CreateNotificationForm.value);

    this.dialog.closeAll();
    await this.ngOnInit()
  }
  loan: any
  selectedLoaneeid: any
  Max: any
  emaails: any
  naame: any

  async fillFormDialog(loanid: any, loaneeid: any, Max: any, email: any, name: any, userid_: any) {
    this.emaails = email
    this.naame = name
    this.Max = Max
    this.userid = userid_;
    await this.loaneeService.GetLoaneeByID(loaneeid)
    this.selectedLoaneeid = loaneeid;
    console.log(this.loaneeService.Loanee);
    await this.loanService.GetLoanById(loanid);
    await this.LoanForm.patchValue(this.loanService.loan);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Fill, dialogConfig);
  }
  loanTerm: any = 0
  monthlyPayment: any = 0
  loanexists: any
  async Calculate() {
    await this.calculateLoanTermAndPayment(this.selectedLoaneeid, this.LoanForm.get('totalprice')?.value, this.loaneeService.Loanee.salary, this.loaneeService.Loanee.numoffamily, this.LoanForm.get('totalmonths')?.value, this.Max)
    console.log(this.loanTerm);
    console.log(this.monthlyPayment);
    console.log(this.selectedLoaneeid, this.LoanForm.get('totalprice')?.value, this.loaneeService.Loanee.salary, this.loaneeService.Loanee.numoffamily, this.LoanForm.get('totalmonths')?.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '25%';
    dialogConfig.height = '164px';
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.backdropClass = 'backdropBackground';
    const dialogRef = this.dialog.open(this.MonthlyAmount, dialogConfig);
  }
  Datee: any
  numberOfMonths?: any
  newDate: any
  flag = false
  message: any
  sub: any
  Dateee: any
  async Confirm() {
    await this.LoanForm.get('monthlyamount')?.setValue(this.monthlyPayment);
    await this.LoanForm.get('totalmonths')?.setValue(this.loanTerm);
    this.Datee = this.LoanForm.get('startdate')?.value;
    const date = new Date(this.Datee);
    this.numberOfMonths = this.LoanForm.get('totalmonths')?.value;
    this.newDate = addMonths(date, this.numberOfMonths);
    console.log(this.newDate);


    await this.LoanForm.get('enddate')?.setValue(this.newDate);
    await this.loanService.SendFormFromLender(this.LoanForm.value);

    this.Dateee = this.LoanForm.get('startdate')?.value
    const DD = new Date(this.Dateee);
    const day = DD.toLocaleString('default', { weekday: 'long' });
    const dayOfMonth = DD.getDate();
    const month = DD.toLocaleString('default', { month: 'long' });
    const year = DD.getFullYear();
    const formattedDate = `${day} ${dayOfMonth} ${month} ${year}`;

    this.sub = "Loans Information Completed !"
    this.message = "Congratulations, you've passed the virtual interview successfully.The Total Price Of the Loan is ($" + this.LoanForm.get('totalprice')?.value + "),and the monthly amount of the installment has been calculated as follows ($" + this.LoanForm.get('monthlyamount')?.value + " ) for (" + this.LoanForm.get('totalmonths')?.value + " ) month/s, Please note that you must agree to the loan's information before " + formattedDate + " to complete the procedures, otherwise the loan will be rejected. Thank you"

    this.CreateNotificationForm.controls['userid'].setValue(this.userid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("Loan Details Filled");
    await this.sendEmail(this.emaails, this.naame, this.message, this.sub);
    await this.notification.CreateNotification(this.CreateNotificationForm.value);

    this.dialog.closeAll();
    await this.ngOnInit()
  }

  async calculateLoanTermAndPayment(loaneeid: any, price: any, salary: any, familymembers: any, months: any, Maxmonth: any) {

    console.log(this.LoanForm.get('startdate')?.value);

    const maxPaymentPercent = 0.2;
    const maxPayment = parseFloat(salary) * maxPaymentPercent;
    const paymentIncreasePercent = 0.02;
    const paymentDecreasePercent = 0.01;

    console.log(maxPaymentPercent, paymentIncreasePercent, paymentDecreasePercent);

    let adjustedMaxPayment = maxPayment;
    let paymentAdjustment = paymentIncreasePercent * parseInt(familymembers) * maxPayment;
    adjustedMaxPayment -= paymentAdjustment;

    console.log(paymentAdjustment);

    await this.loanService.ExistingLoanCounter(loaneeid);
    this.loanexists = this.loanService.LoanCounter;
    paymentAdjustment = paymentDecreasePercent * this.loanexists * maxPayment;
    adjustedMaxPayment -= paymentAdjustment;

    const maxMonthlyPayment = Math.min(adjustedMaxPayment, parseFloat(price));
    // let loanTermInMonths = Math.round(parseFloat(price) / maxMonthlyPayment);
    let loanTermInMonths = Math.min(this.Max, parseInt(months));

    const monthlyInterestFreePayment = parseFloat(price) / loanTermInMonths;
    this.loanTerm = loanTermInMonths;
    this.monthlyPayment = monthlyInterestFreePayment.toFixed(1);
    this.flag = true;

  }
  checkDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate < currentDate) {
      return { checkDateInvalid: true };
    }

    return null;
  }

}
