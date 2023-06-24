import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public http: HttpClient,
    public router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {}

  progressBarVisible: boolean = true;

  DeleteUser(UID: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .delete(`${environment.apiUrl}/User/DeleteUser/` + UID)
        .subscribe({
          next: (res) => {
            this.spinner.hide();
            resolve();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
    });
  }

  Updateuser: any;
  async UpdateUser(user: any) {
    await this.GetUserById(user.userid);
    if (this.ImgaeName != null) user.userimage = this.ImgaeName;
    else user.userimage = this.userById.userimage;

    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/User/UpdateUser`, user).subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success('Information Updated Successfuly');
          resolve();
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error('Something Wrong');
        },
      });
    });
  }
  async UpdatePass(user: any) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .put(`${environment.apiUrl}/User/UpdatePassword`, user)
        .subscribe({
          next: () => {
            this.progressBarVisible = false;
            this.toastr.success('Password Updated Successfuly');
            resolve();
          },
          error: (err) => {
            this.progressBarVisible = false;
            this.toastr.error('Something Wrong');
          },
        });
    });
  }
  userById: any;
  GetUserById(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/User/GetUserById/` + id).subscribe({
        next: (res) => {
          this.userById = res;
          this.progressBarVisible = false;
          resolve();
        },
        error: (err) => {
          this.progressBarVisible = false;
        },
      });
    });
  }
  ImgaeName: any;
  UploadImage(imageFile: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/User/UploadImage`, imageFile)
        .subscribe({
          next: (res: any) => {
            this.spinner.hide();
            this.ImgaeName = res.userimage;
            resolve();
          },
          error: () => {},
        });
    });
  }

  LenderFollowers: any;
  GetFollowers(lendId: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/User/GetAllFollower/` + lendId)
        .subscribe({
          next: (res) => {
            this.LenderFollowers = res;
            this.spinner.hide();
            resolve();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
    });
  }

  AddFollower(lendId: any, loaneId: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(`${environment.apiUrl}/User/addfollower/${lendId}/${loaneId}`, {})
        .subscribe({
          next: (res) => {
            this.spinner.hide();
            resolve();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
    });
  }
  DeleteFollower(lendId: any, loaneId: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .delete(
          `${environment.apiUrl}/User/DeleteFollower/${lendId}/${loaneId}`,
          {}
        )
        .subscribe({
          next: (res) => {
            this.spinner.hide();
            resolve();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
    });
  }
}
