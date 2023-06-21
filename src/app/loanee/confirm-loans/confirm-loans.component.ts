import { Component,ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { LoaneeService } from 'src/app/loanee.service';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-confirm-loans',
  templateUrl: './confirm-loans.component.html',
  styleUrls: ['./confirm-loans.component.css']
})
export class ConfirmLoansComponent {
@ViewChild("ViewLoanDetails") Details:any
@ViewChild("Confirm") Confirm:any
@ViewChild("Reject") Reject:any
@ViewChild("Feedback") FeedBackDialog:any
constructor( public loaneeService:LoaneeService, public dialog: MatDialog, public EmailService: EmailsService, public loanService: LoanService){}
ConfirmationLoans:any
loaneeid:any
feedbackk:any=0;
async ngOnInit()
{
 this.loaneeid= await localStorage.getItem('LoaneeID')
  await this.loaneeService.GetConfirmLoans(parseInt(this.loaneeid))
   
  this.ConfirmationLoans = this.loaneeService.LoansConfirmation
  console.log(this.loaneeService.LoansConfirmation)
  console.log(parseInt(this.loaneeid));
}
async ngOnDestroy(){
  this.loaneeService.progressBarVisible = true;
}
lenderEmail:any
lenderName:any
monthlyAmount:any
startDate:any
EndDate:any
loanId:any
meetingID:any
openDetails(email:any,firstname:any,monthlyamount:any,startdate:any,enddate:any,loanid:any,meetingID:any)
{
  this.lenderEmail=email
  this.lenderName=firstname
  this.monthlyAmount=monthlyamount
  this.startDate=startdate
  this.EndDate=enddate
  this.loanId=loanid
  this.meetingID=meetingID
  console.log(this.loanId)
  const dialogConfig = new MatDialogConfig();
  dialogConfig.backdropClass = 'backdropBackground';
  dialogConfig.panelClass = 'mat-dialog-container';
this.dialog.open(this.Details,dialogConfig);
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
openRejectDialog(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.backdropClass = 'backdropBackground';
  dialogConfig.panelClass = 'mat-dialog-container';
this.dialog.open(this.Reject,dialogConfig)
}
OpenConfirm()
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.backdropClass = 'backdropBackground';
  dialogConfig.panelClass = 'mat-dialog-container';
this.dialog.open(this.Confirm,dialogConfig)
}
s:any
m:any
loaneefName=localStorage.getItem('LoaneeName')
loaneeLName=localStorage.getItem('LoaneeLastName')
  async RejectLoan()
{
  this.s="Cancle Loan"
  this.m="We would like to inform you that "+this.loaneefName+" "+this.loaneeLName+" cancled the loan!"
  await this.loanService.deleteLoan(this.loanId)
  await this.sendEmail(this.lenderEmail,this.lenderName,this.m,this.s);
   
  this.dialog.closeAll();
  await this.ngOnInit()
}
  async ConfirmLoan()
{
  this.s="Confirm Loan"
  this.m="We would like to inform you that "+this.loaneefName+" "+this.loaneeLName+" confirm the loan!"
  await this.loanService.updateLoanStatus(this.loanId,3)
  await this.sendEmail(this.lenderEmail,this.lenderName,this.m,this.s);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.backdropClass = 'backdropBackground';
  dialogConfig.panelClass = 'mat-dialog-container';
  this.dialog.open(this.FeedBackDialog,dialogConfig);
  this.dialog.closeAll();
await this.ngOnInit()
}
async Givefeedback(feedback:any)
{
  await this.loaneeService.GiveRateForLender(this.meetingID,feedback);
  this.dialog.closeAll();
await this.ngOnInit()
}
}
