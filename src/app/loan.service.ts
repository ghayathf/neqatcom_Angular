import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService) { }
  LaonRequests: any = []
  GetAllRequestedLoans(lenderid: number, statusid: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loan/GetAllStatusLoans/` + lenderid + "/" + statusid).subscribe(
        (res) => {
          this.LaonRequests = res
          this.spinner.hide();
          resolve()
        },
        (err) => {
          ;
          this.spinner.hide();
        }
      )
    })
  }
  deleteLoan(loanId: number) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}/Loan/DeleteLoan/` + loanId).subscribe(
        {
          next: () => {
            this.spinner.hide()

            resolve()
          },
          error: () => {
            this.spinner.hide()

          }
        }
      )
    })

  }
  updateLoanStatus(LoanId: any, status: any) {
    return new Promise<void>((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/Loan/UpdateLoan/` + LoanId + "/" + status, {}).subscribe(
        () => {
          resolve()

        },
        (err) => {

          this.spinner.hide();
        }
      )
    })
  }
  monthly:any
  calc(){
    const monthlyAmount = this.loan.monthlyamount;
    const estimatedPrice = this.loan.estimatedprice;
    const paypalTaxRate = 0.029; // Paypal tax rate for USD transactions
    const paypalTaxFixed = 0.3; // Paypal fixed tax for USD transactions
    const monthlyAmountWithTax = monthlyAmount + (monthlyAmount * paypalTaxRate) + paypalTaxFixed;
    const estimatedwithtax = estimatedPrice + (estimatedPrice * paypalTaxRate) + paypalTaxFixed;

    if(estimatedPrice >= monthlyAmountWithTax)
    this.monthly = monthlyAmountWithTax
    else
    this.monthly = estimatedPrice

    this.monthly = this.monthly.toFixed(2)
  }
  loan: any;
  GetLoanById(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loan/GetLoanById/` + id).subscribe(
        (res) => {
          this.loan = res
          this.spinner.hide();
          this.calc()
          resolve()
        },
        (err) => {
          ;
          this.spinner.hide();
        }
      )
    })
  }
  SendFormFromLender(Data: any) {
    Data.totalprice = parseFloat(Data.totalprice)
    Data.totalmonths = parseFloat(Data.totalmonths)
    Data.monthlyamount = parseFloat(Data.monthlyamount)


    return new Promise<void>((resolve, reject) => {

      this.http.put(`${environment.apiUrl}/Loan/ConfirmNewLoanInfo`, Data).subscribe(
        (res) => {
          resolve()
        },
        (err) => {
          ;
        }
      )
    })
  }
  LoanCounter: any
  ExistingLoanCounter(Loaneeid: any) {
    return new Promise<void>((resolve, reject) => {

      this.spinner.show();

      this.http.get(`${environment.apiUrl}/Loan/ExistingLoanCounter/` + Loaneeid).subscribe(
        (res) => {
          this.LoanCounter = res

          this.spinner.hide();

          resolve()
        },
        (err) => {
          ;
          this.spinner.hide();

        }
      )
    })
  }
  PostponeRequests: any = []
  GetAllRequestedPostpones(lenderid: any, statusid: any) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loan/GetAllPostponeRequests/` + lenderid + "/" + statusid).subscribe(
        (res) => {
          this.PostponeRequests = res

          this.spinner.hide();
          resolve()
        },
        (err) => {
          ;
          this.spinner.hide();
        }
      )
    })
  }

  requestNewLoan(loaneeid: any, offerid: any, totalmonths: any) {

    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post(`${environment.apiUrl}/Loan/RequestNewLoan/${loaneeid}/${offerid}/${totalmonths}`, {}).subscribe(

        (res) => {
          this.toaster.success("Your request has been sent successfully");
          this.spinner.hide();

          resolve()
        },
        (err) => {

          this.spinner.hide();
          this.toaster.error("Try again");
        }
      )
    })
  }



  updatePostponeStatus(LoanId: any, status: any, loaneeid: any) {

    return new Promise<void>((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/Loan/UpdatePostponeStatus/` + LoanId + "/" + status + "/" + loaneeid, {}).subscribe(
        () => {
          resolve()
        },
        (err) => {
          ;

          this.spinner.hide();
        }
      )
    })
  }
}
