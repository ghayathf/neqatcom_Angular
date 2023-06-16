import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { EmailsService } from 'src/app/emails.service';
import { NotificationsService } from 'src/app/notifications.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-manage-loanee-complaints',
  templateUrl: './manage-loanee-complaints.component.html',
  styleUrls: ['./manage-loanee-complaints.component.css']
})
export class ManageLoaneeComplaintsComponent {
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
    await this.adminService.GetAllComplaints();
    this.complaints = this.adminService.complaints;
    await this.adminService.CheckFiveDays();
    this.Length = this.complaints.Length
    await this.adminService.GetComplaintsStatistics()
    this.loaneetoLender = this.adminService.ComplaintsStats.loaneetolendercount
    this.FromLender = this.adminService.ComplaintsStats.lendertoloaneecount
    this.FromSystem = this.adminService.ComplaintsStats.systemtoloaneecount
  }
  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),
    })

  ComplaintStatus = ComplaintStatus;
  async sendEmail(email: string, receiver: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,
      receivername: receiver,
      message: mess
    };

    await this.EmailService.SentEmail(emailParams);
  }
  s: any
  m: any
  async ManageLoaneeComplaints() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.adminService.ManageLenderComplaints(this.selectedloaneeId, this.selectedcomplaint);
    if (this.selectedwarnCounter < 3) {
      this.s = "Warning Email"
      this.m = "Please note that a complaint has been filed against you. When the three warnings are exceeded, the complaints will be dealt with by hiding your company from the search engine."

    }
    else {
      this.s = "Intimation Email"
      this.m = "This is contrary to the three warnings that you received through us. We apologize to inform you that your company will be hidden from the search engine for a period of five days according to the rules of Neqatcom."

    }
    await this.sendEmail(this.selectedEmail, this.selectedFirstName, this.m, this.s);
    this.CreateNotificationForm.controls['userid'].setValue(this.selecteduserid);
    this.CreateNotificationForm.controls['notificationsmessage'].setValue("A Complaint has been filed against you");
    await this.notification.CreateNotification(this.CreateNotificationForm.value);


    await this.adminService.GetAllComplaints()
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
    this.selectedcomplaint = complaintsID
    this.selectedwarnCounter = warnCounter
    this.selecteduserid = userid
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Manage, dialogConfig)


    Swal.fire({
      title: '<h1 style="color: white;">Confirming?</h1>',
      html: '<span style="color: white;">By managing this complaints this lender will have a negative impact, causing it\'s name to be hidden in the search process. </span>',

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
        this.ManageLoaneeComplaints();
      } else {
        this.dialog.closeAll();
      }
    });
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
      html: '<span style="color: white;">Are you sure you don\'t want to manage this complaint ?</span>',
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
}
enum ComplaintStatus {
  Lender = 2,
  System = 3,

}


