import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LenderStoreService {

  constructor(public http: HttpClient, public router: Router, private spinner: NgxSpinnerService, public toastr: ToastrService) { }

  Requests: any = []
  GetLenderStoreRequest() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/LenderStore/GetAllLenderUser`).subscribe(
        {
          next: (res) => {
            this.Requests = res
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            this.spinner.hide()
            ;
          }
        }
      )
    }
    )
  }

  DeleteLenderStore(LID: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}/LenderStore/DeleteLenderStore/` + LID).subscribe(
        {
          next: (res) => {
            this.spinner.hide()
            resolve()
          },
          error: (err) => {
            this.spinner.hide()
          }
        }
      )
    }
    )
  }
  // RequestFlag: any = false;
  CRR: any;
  check: any
  flag: any
  GetallCommercialRegister(CR: any) {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Admin/GetAllCommercialRegistres`).subscribe({
        next: (res) => {
          this.CRR = res;
          this.check = this.CRR.find((x: { commercialcode: number; }) => x.commercialcode == CR);

          if (this.check != null) {
            this.toastr.success("Valid Company")
            this.flag = true;
          }
          else {
            this.toastr.error("Not a valid company")
            this.flag = false;
          }

          resolve();
        },
        error: (err) => {
          ;
        }
      });
    });
  }
  LenderInfo: any = []
  GetLenderInfo(LendId:number) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/LenderStore/GetLenderInfo/`+LendId).subscribe(
        (res) => {
          this.LenderInfo = res
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
  async AcceptRequest(LID: any, Cr: any) {
    this.spinner.show()
    await this.GetallCommercialRegister(Cr);
    return new Promise<void>((resolve, reject) => {
      this.http.put(`${environment.apiUrl}/Admin/AcceptLenderRegistration/` + LID, {}).subscribe(
        {
          next: (res) => {
            this.spinner.hide()
            if (this.flag)
              this.toastr.success("Register Request Accepted")
            else
              this.toastr.error("Invalid Commercial Register")

            resolve()
          },
          error: (err) => {
            // this.toastr.error("Something went wrong")
            this.spinner.hide()
            ;
          }
        }
      )
    }
    )
  }
  loaneesLender: any
  GetAllLoaneesForLenderStore(id: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/LenderStore/LoaneesForLenders/` + id).subscribe({
        next: (res) => {
          this.loaneesLender = res;
          this.spinner.hide()
          resolve();
        },
        error: (err) => {
          ;
          this.spinner.hide()
        }
      });
    });
  }
  Followers: any
  GetAllFollowers(id: any) {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/User/GetAllFollower/` + id).subscribe({
        next: (res) => {
          this.Followers = res;
          this.spinner.hide()
          resolve();
        },
        error: (err) => {
          ;
          this.spinner.hide()
        }
      });
    });
  }

  loansoffer: any
  GetAllGetAllLoanOffer(lenderid: any, id: any) {
    this.spinner.show()

    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/LenderStore/GetAllLoanOffer/` + lenderid + "/" + id).subscribe({
        next: (res) => {
          this.loansoffer = res;
          this.spinner.hide()
          resolve();
        },
        error: (err) => {
          ;
          this.spinner.hide()
        }
      });
    });
  }


  GiveComplaintForLoanee(Complaint:any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.post(`${environment.apiUrl}/LenderStore/giveComplaintForLoanee`,Complaint).subscribe(
        () => {
          this.spinner.hide();
          resolve()
        },
        (err) => {
          this.spinner.hide();
        }
      )
    })
  }
  LenderPayments:any=[]
  GetLenderPayments(lenderid:any){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/LenderStore/GetLenderPayments/`+lenderid).subscribe(
      {
        next:(res)=>{
          this.LenderPayments=res
        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{
        this.spinner.hide()

          }
        }
      )
    }
  )
}
LenderCounters:any=[]
GetLenderCounters(lenderid:any){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/LenderStore/GetLenderCounters/`+lenderid).subscribe(
      {

        next:(res)=>{
          this.LenderCounters=res

        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{
        this.spinner.hide()

          }
        }
      )
    }
  )
}





}
