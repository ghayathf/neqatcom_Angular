import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { EmailsService } from 'src/app/emails.service';
import { NotificationsService } from 'src/app/notifications.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-manage-lender-complaints',
  templateUrl: './manage-lender-complaints.component.html',
  styleUrls: ['./manage-lender-complaints.component.css']
})
export class ManageLenderComplaintsComponent {
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('ManageComplaintForm') Manage: any
  fileName = 'ExcelSheet.xlsx';
  exportexcel() {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  constructor(public adminService: AdminService, public EmailService: EmailsService, public dialog: MatDialog, private notification: NotificationsService) { }
  complaints: any
  Length: any
  loaneetoLender: any
  FromSystem: any
  FromLender: any
  async ngOnInit() {
    await this.adminService.GetLendeComplaints()
    await this.adminService.GetComplaintsStatistics()
    
    this.complaints = this.adminService.Lendercomplaints;

    this.Length = this.complaints.Length

    this.loaneetoLender = this.adminService.ComplaintsStats.loaneetolendercount
    this.FromLender = this.adminService.ComplaintsStats.lendertoloaneecount
    this.FromSystem = this.adminService.ComplaintsStats.systemtoloaneecount
  }
  async ngOnDestroy(){
    this.adminService.progressBarVisible = true
  }
  deleteComplaintId: any

  OpenDeleteDialog(CID: any) {
    this.deleteComplaintId = CID
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Delete, dialogConfig)



    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">>Are you sure you don\'t want to manage this complaint ?</span>',
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
        this.DeleteComplaint();
      } else {
        this.dialog.closeAll();
      }
    });
  }
  async DeleteComplaint() {
    this.ngOnInit()
    this.dialog.closeAll();
    this.adminService.DeleteComplaint(this.deleteComplaintId)
    await this.dialog.closeAll()
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

  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),
    })

  s: any
  m: any
  async ManageLenderComplaints() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.adminService.ManageLoaneeComplaints(this.selectedLendId, this.selectedcomplaint);

    this.s = "Warning Email"
    this.m = "Please note that a complaint has been filed against you. warnings are affect on your credit score , Be Careful !"
    await this.sendEmail(this.selectedEmail, this.selectedFirstName, this.m, this.s);
    this.CreateNotificationForm.controls['userid'].setValue(this.selecteduserid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("A Complaint has been filed against you");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);
    await this.dialog.closeAll()
    await this.ngOnInit()

  }
  selectedLendId: any
  selectedEmail: any
  selectedFirstName: any
  selectedloaneeId: any
  selectedcomplaint: any
  selectedwarnCounter: any
  selecteduserid: any
  OpenManageDialog(lenderid: any, email: any, firstname: any, loaneeid: any, complaintsID: any, warnCounter: any, userid: any) {
    this.selectedLendId = lenderid
    this.selectedEmail = email
    this.selectedFirstName = firstname
    this.selectedloaneeId = loaneeid
    this.selecteduserid = userid
    console.log(this.complaints);

    this.selectedcomplaint = complaintsID
    this.selectedwarnCounter = warnCounter
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Manage, dialogConfig)


    Swal.fire({
      title: '<h1 style="color: white;">Confirming?</h1>',
      html: '<span style="color: white;"> By managing this complaint the loanees credit score will be affected</span>',

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
        this.ManageLenderComplaints();
      } else {
        this.dialog.closeAll();
      }
    });




  }
  ComplaintStatus = ComplaintStatus;
}
enum ComplaintStatus {
  Loanee = 1,

}
