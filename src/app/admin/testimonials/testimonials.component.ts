import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tr } from 'date-fns/locale';
import { TestimonialsService } from 'src/app/testimonials.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {
  constructor(public TestimonialService: TestimonialsService, private dialog: MatDialog) { }
  @ViewChild('DeleteForm') Delete: any
  testimonials: any = [];
  async ngOnInit() {
    await this.TestimonialService.GetAllTestimonials();
    this.testimonials = await this.TestimonialService.Testimonials;
  }
  async ngOnDestroy() {
    this.TestimonialService.progressBarVisible = true;
  }
  async ChangeStatus(message: any) {
    await this.TestimonialService.UpdateRequest(message);
    await this.TestimonialService.GetAllTestimonials();
    await this.dialog.closeAll()
    await this.ngOnInit()
  }

  selectedItem = 0;
  openDeleteDialog(messageId: number) {
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
        this.DeleteTestimonial();
      } else {
        this.dialog.closeAll();
      }
    });
  }
  async DeleteTestimonial() {
    this.ngOnInit()
    this.dialog.closeAll();
    this.TestimonialService.DeleteMessage(this.selectedItem);
    this.TestimonialService.GetAllTestimonials();
    await this.dialog.closeAll()
    await this.ngOnInit()
  }
}
