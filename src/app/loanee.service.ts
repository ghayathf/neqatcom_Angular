import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoaneeService {
  progressBarVisible: boolean = true;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService) { }
  Loanees:any = []
  GetAllLoanees() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loanee/GetAllLoaneeUser`).subscribe(
        (res) => {
          this.Loanees = res
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
  Loanee:any
  GetLoaneeByID(loaneeID:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loanee/GetLoaneeById/`+loaneeID).subscribe(
        (res) => {
          this.Loanee = res
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
  CurrentAndFinishedLoans:any
  GetCurrentAndFinishedLoans(LID:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Loanee/GetCurrentAndFinishedLoans/`+LID).subscribe(
        (res) => {
          this.CurrentAndFinishedLoans = res

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
  GiveComplaintForLender(Complaint:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post(`${environment.apiUrl}/Loanee/giveComplaintForLender`,Complaint).subscribe(
        () => {
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

  LoansConfirmation:any = []
  GetConfirmLoans(loaneeid:any) {
    return new Promise<void>((resolve, reject) => {

      this.http.get(`${environment.apiUrl}/Loanee/GetConfirmLoans/`+loaneeid).subscribe(
        (res) => {
          this.LoansConfirmation = res
this.progressBarVisible = false
          resolve()
        },
        (err) => {
          this.progressBarVisible = false
        }
      )
    })
  }
  GiveRateForLender(MeetingID :any,feedback:any) {
    return new Promise<void>((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/Loanee/GiveRateForLender/`+ MeetingID+"/"+feedback,{}).subscribe(
        () => {
          resolve()
        },
        (err) => {
          this.spinner.hide();
        }
      )
    })
  }


  CreateMeeting(meetingInfo:any) { meetingInfo.lenderid= parseInt(meetingInfo.lenderid)
    return new Promise<void>((resolve, reject) => {

      this.spinner.show();
      this.http.post(`${environment.apiUrl}/Meeting/CreateMeeting`,meetingInfo).subscribe(
        (res) => {

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
}
