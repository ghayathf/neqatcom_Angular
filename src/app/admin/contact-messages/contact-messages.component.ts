import { Component, ViewChild } from '@angular/core';
import { ContactusService } from 'src/app/contactus.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.css']
})
export class ContactMessagesComponent {
  @ViewChild('DeleteForm') Delete: any

  constructor(public contactService: ContactusService, private dialog: MatDialog) { }
  AllContacts: any
  Length: any
  async ngOnInit() {
    await this.contactService.GetAllContactUs()
    this.AllContacts = this.contactService.AllContactUs
    this.Length = this.AllContacts.length
  }
  selectedItem = 0
  async openDeleteDialog(messageId: number) {
    this.selectedItem = messageId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Delete, dialogConfig)


    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">Would you like to Delete this Message ?</span>',
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
        this.DeleteMessage();
      } else {
        this.dialog.closeAll();
      }
    });
  }
  async DeleteMessage() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.contactService.DeleteMessage(this.selectedItem);
    await this.dialog.closeAll()
    await this.ngOnInit()
  }
}
