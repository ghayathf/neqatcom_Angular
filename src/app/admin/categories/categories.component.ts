import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/admin.service';
import { CategoriesService } from 'src/app/categories.service';
import { NotificationsService } from 'src/app/notifications.service';
import { RegisterService } from 'src/app/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @ViewChild('UpdateForm') Update: any
  @ViewChild('DeleteForm') Delete: any
  @ViewChild('CreateForm') Create: any
  UpdateCategoryForm = new FormGroup(
    {
      categoryid: new FormControl(''),
      categoryname: new FormControl('', Validators.required),
      categoryimage: new FormControl('')
    })

  CreateCategoryForm = new FormGroup(
    {
      categoryname: new FormControl('', Validators.required),
      categoryimage: new FormControl('')
    })
  CreateNotificationForm = new FormGroup(
    {
      userid: new FormControl(''),
      notificationsmessage: new FormControl(''),
    })
  get CategoryName(): FormControl {
    return this.CreateCategoryForm.get('categoryname') as FormControl;
  }

  get CategoryImage(): FormControl {
    return this.CreateCategoryForm.get('categoryimage') as FormControl;
  }

  constructor(public categoriesService: CategoriesService, public dialog: MatDialog, public adminService: AdminService, private notification: NotificationsService, public registerService: RegisterService) { }
  cats: any
  Length: any
  offers: any
  categories: any
  loans: any
  async ngOnInit() {
    await this.categoriesService.GetAllCategories()
    await this.adminService.GetCategoriesStatistics()
    this.cats = this.categoriesService.categories
    this.Length = this.cats.length

    this.offers = this.adminService.CategoriesStats.totaloffers
    this.categories = this.adminService.CategoriesStats.totalcategories
    this.loans = this.adminService.CategoriesStats.totalloans
  }
  async ngOnDestroy(){
    this.adminService.progressBarVisible = true
  }
  SelectedForDelete: any
  openDeleteDialog(catId: number) {
    this.SelectedForDelete = catId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Delete, dialogConfig)

    Swal.fire({
      title: '<h1 style="color: white;">Deleting?</h1>',
      html: '<span style="color: white;">Would you like to Delete this category?</span>',
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
        this.DeleteCategory();
      } else {
        this.dialog.closeAll();
      }
    });
  }
  async DeleteCategory() {
    this.ngOnInit()
    this.dialog.closeAll();
    await this.categoriesService.DeleteCategory(this.SelectedForDelete)
await this.dialog.closeAll()
await this.ngOnInit()
  }
  async OpenUpdateCategoryDialog(catId: number) {
    await this.categoriesService.GetCategoryById(catId)
    await this.UpdateCategoryForm.patchValue(this.categoriesService.Category)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Update, dialogConfig)
  }
  OpenCreateDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1000px';
    dialogConfig.maxHeight = '80vh';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.Create, dialogConfig)
  }
  async UpdateCategory() {
    await this.categoriesService.updateCategory(this.UpdateCategoryForm.value)
    await this.dialog.closeAll()
await this.ngOnInit()
  }
  async CreateCategory() {
    await this.categoriesService.CreateCategory(this.CreateCategoryForm.value);
    await this.registerService.getAllUsers();
    for (const lenderUser of this.registerService.lenderUsers) {
      const userId = lenderUser.userid;

      this.CreateNotificationForm.controls['userid'].setValue(userId);
      this.CreateNotificationForm.controls['notificationsmessage'].setValue('Check out our new category');
      await this.notification.CreateNotification(this.CreateNotificationForm.value);

    }
    await this.dialog.closeAll()
await this.ngOnInit()
  }
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.categoriesService.UploadImage(formdata);
    }
  }

}
