import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    public http: HttpClient,
    public router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {}

  progressBarVisible: boolean = true;

  Notifications: any = [];
  GetNotificationById(id: number) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/Notification/GetNotificationById/` + id)
        .subscribe({
          next: (res) => {
            this.Notifications = res;
            this.spinner.hide();

            resolve();
          },
          error: (err) => {
            this.spinner.hide();
          },
        });
    });
  }

  CreateNotification(notification: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .post(
          `${environment.apiUrl}/Notification/CreateNewNotification`,
          notification
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
  DeleteNotifications(id: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http
        .delete(
          `${environment.apiUrl}/Notification/DeleteNotificationsByUSerID/` + id
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
