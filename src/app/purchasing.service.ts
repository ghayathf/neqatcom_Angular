import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PurchasingService {
  progressBarVisible: boolean = true;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  Payments: any = [];
  flag: any;
  GetAllPaymentsById(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .get(`${environment.apiUrl}/Purchasing/GettAllPayments/` + id)
        .subscribe(
          (res) => {
            this.Payments = res;
            if (this.Payments == null) this.flag = 0;
            else this.flag = 1;
            this.spinner.hide();
            resolve();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    });
  }

  ForgiveLoanee(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .put(`${environment.apiUrl}/Purchasing/ForGiveMonthly/${id}`, {})
        .subscribe(
          () => {
            this.spinner.hide();
            this.toaster.success('Loanee Has Successfully forgived');
            resolve();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    });
  }
  PayCash(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .put(`${environment.apiUrl}/Purchasing/PayCash/${id}`, {})
        .subscribe(
          () => {
            this.spinner.hide();
            this.toaster.success('Successful Payment');

            resolve();
          },
          (err) => {
            this.toaster.error('Error');
            this.spinner.hide();
          }
        );
    });
  }
  PayOnline(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .put(`${environment.apiUrl}/Purchasing/PayOnline/${id}`, {})
        .subscribe(
          () => {
            this.spinner.hide();
            this.toaster.success('Successful Payment');
            resolve();
          },
          (err) => {
            this.toaster.error('Error');
            this.spinner.hide();
          }
        );
    });
  }
}
