import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthGuard } from 'src/app/auth.guard';
import { CategoriesService } from 'src/app/categories.service';
import { LenderStoreService } from 'src/app/lender-store.service';
import { NotificationsService } from 'src/app/notifications.service';
import { OfferService } from 'src/app/offer.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// CommonJS
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('CreateForm') Create: any
  UpdateOfferForm = new FormGroup(
    {
      offerid: new FormControl(''),
      descriptions: new FormControl('', Validators.required),
      minmonth: new FormControl('', Validators.required),
      lenderid: new FormControl(''),
      categoryid: new FormControl('', Validators.required),
    })




  CreateOfferForm = new FormGroup(
    {

      minmonth: new FormControl('', Validators.required),
      descriptions: new FormControl('', Validators.required),
      lenderid: new FormControl(''),
      categoryid: new FormControl('', Validators.required),
    })

  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),

    })

  get MinMounth(): FormControl {
    return this, this.CreateOfferForm.get('minmonth') as FormControl;
  }
  get Descriptions(): FormControl {
    return this.CreateOfferForm.get('descriptions') as FormControl;
  }
  get CategoryId(): FormControl {
    return this.CreateOfferForm.get('categoryid') as FormControl;
  }

  // get TotalMonth(): FormControl {
  //   return this.CreateOfferForm.get('totalmonths') as FormControl;
  // }
  constructor(private notification: NotificationsService, public offerService: OfferService, public AuthGard: AuthGuard, public dialog: MatDialog, public categoryService: CategoriesService, public lenderService: LenderStoreService) { }
  offers: any;

  lenderid: any;
  length: any
  async ngOnInit() {

    const userlender = localStorage.getItem('Lenderid')
    if (userlender != null) {
      this.lenderid = parseInt(userlender);
    }
    await this.offerService.GetAllOffersById(this.lenderid);
    this.offers = this.offerService.offersById;
    this.length = this.offers.length
    await this.categoryService.GetAllCategories()
  }
  async ngOnDestroy() {
    this.categoryService.progressBarVisible = true
  }

  offer: any
  selectedUpdatedCat: any
  CatId: any
  Catname:any
  async OpenUpdateOfferDialog(id: any) {
    await this.offerService.GetOfferById(id)
    this.offer = this.offerService.myOffer;
    await this.UpdateOfferForm.patchValue(this.offerService.myOffer)
    this.UpdateOfferForm.controls['lenderid'].setValue(this.lenderid);
    this.selectedUpdatedCat = this.offerService.myOffer.categoryid
    await this.categoryService.GetCategoryById(this.selectedUpdatedCat)
    // this.CatId = this.offerService.myOffer.descriptions
    this.Catname = this.categoryService.Category.categoryname

    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Update, dialogConfig)
  }

  async OpenCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.height = '64vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    await this.dialog.open(this.Create, dialogConfig)
  }
  async UpdateOffer() {
    if (this.selectedUpdatedCat != null)
      this.UpdateOfferForm.patchValue({
        categoryid: this.selectedUpdatedCat
      });
    else {
      this.selectedUpdatedCat = this.offer.categoryid
      this.UpdateOfferForm.patchValue({
        categoryid: this.selectedUpdatedCat
      });
    }
    await this.offerService.updateOffer(this.UpdateOfferForm.value)
    this.dialog.closeAll();
   await this.ngOnInit()
  }
  SelectedForDelete: any
  openDeleteDialog(id: any): void {
    this.SelectedForDelete = id;
    const dialogRef = this.dialog.open(this.Delete, {
      backdropClass: 'backdropBackground' // This is the "wanted" line
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Perform any necessary actions after the dialog is closed
    });

    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">Would you like to delete this offer?</span>',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm-button',
        cancelButton: 'swal-custom-cancel-button',
      },confirmButtonColor: '#DD5353',
      background: '#3e3e40',
    }).then((result) => {
      if (result.isConfirmed) {
        // DeleteOffer() logic goes here
        this.DeleteOffer();
      } else {
        this.dialog.closeAll();
      }
    });




  }
  async DeleteOffer() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.offerService.DeleteOffer(this.SelectedForDelete)
    this.dialog.closeAll();
    await this.ngOnInit()

  }
  id?: any;
  async CreateOffer() {
    const lenderId = localStorage.getItem('Lenderid');
    if (lenderId !== null) {
      this.id = parseInt(lenderId);
    } else {
      // Handle the case when the value is null
      // You can assign a default value or throw an error, depending on your use case
      // For example:
      throw new Error('Lenderid not found in localStorage.');
    }
    console.log(this.id);
    let lenderName = localStorage.getItem('lenderName');
    this.CreateOfferForm.controls['lenderid'].setValue(this.id);
    await this.offerService.CreateOffer(this.CreateOfferForm.value);
    await this.lenderService.GetAllFollowers(this.id);
    for (var i = 0; i < this.lenderService.Followers.length; i++) {
      this.CreateNotificationForm.controls['userid'].setValue(this.lenderService.Followers[i].userid);
      this.CreateNotificationForm.controls['notificationsmessage'].setValue(lenderName + " has offered a new offer");
      await this.notification.CreateNotification(this.CreateNotificationForm.value)
    }

    this.dialog.closeAll();
await this.ngOnInit()
  }
}
