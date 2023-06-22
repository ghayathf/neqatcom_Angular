import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  progressBarVisible: boolean = true;
  constructor(private http: HttpClient, private toaster: ToastrService, private spinner: NgxSpinnerService) { }
  complaints:any=[]
  GetAllComplaints(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/Admin/GetLenderStoresComplaints`).subscribe(
      {
        next:(res)=>{
          this.complaints=res
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
LoaneeStats:any=[]
GetLoaneesStatistics(){
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/AdminStatisticsLoanee`).subscribe(
    {
      next:(res)=>{
        this.progressBarVisible = false;
        this.LoaneeStats=res
      resolve()
                  },
      error:(err)=>{
      this.progressBarVisible = false;

        }
      }
    )
  }
)
}
LenderStats:any=[]
GetLendersStatistics(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/lenderAdminStatistics`).subscribe(
    {
      next:(res)=>{
        this.LenderStats=res
      this.progressBarVisible = false;
      resolve()
                  },
      error:(err)=>{
      this.progressBarVisible = false;

        }
      }
    )
  }
)
}
ComplaintsStats:any=[]
GetComplaintsStatistics(){
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/complaintsStatistics`).subscribe(
    {
      next:(res)=>{
        this.ComplaintsStats=res
      this.progressBarVisible = false;
      resolve()
                  },
      error:(err)=>{
      this.progressBarVisible = false;

        }
      }
    )
  }
)
}
CategoriesStats:any=[]
GetCategoriesStatistics(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/categoriesStatistics`).subscribe(
    {
      next:(res)=>{
        this.CategoriesStats=res
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
DeleteComplaint(CID:any){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.put(`${environment.apiUrl}/Admin/deleteComplaint/${CID}`,{}).subscribe(
    {
      next:(res)=>{
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
ManageLoaneeComplaints(lenderid:number,complaintsID:any)
{
  return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Admin/ManageLoaneeComplaints/`+lenderid+"/"+complaintsID,{}).subscribe(
      {
        next:(res)=>{

        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{
        this.spinner.hide()
        ;
          }
        }
      )
    }
  )

}
CheckFiveDays() {
  this.spinner.show();
return new Promise<void>((resolve, reject) => {
  this.http.post(`${environment.apiUrl}/Admin/CheckFiveDays`,{}).subscribe(
    {
      next: () => {

        this.spinner.hide();
resolve();
      },
      error: (err) => {
        this.spinner.hide();
        ;

      }
    }
  )})
}
ActorCounter:any=[]
  GetActorCounterCharts(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/Admin/ActorCounter`).subscribe(
      {
        next:(res)=>{
          this.ActorCounter=res
        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{
        this.spinner.hide()
        ;
          }
        }
      )
    }
  )
}
CreditScoreCounter:any=[]
  GetCreditScoreCounterCharts(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/Admin/LoaneeCreditScores`).subscribe(
      {
        next:(res)=>{
          this.CreditScoreCounter=res
        this.spinner.hide()
        resolve()
                    },
        error:(err)=>{
        this.spinner.hide()
        ;
          }
        }
      )
    }
  )
}
Lendercomplaints:any=[]
  GetLendeComplaints(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/Admin/GetAllComplaints`).subscribe(
      {
        next:(res)=>{
          this.Lendercomplaints=res
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
ManageLenderComplaints(loaneeid:number,complaintsID:any)
{

  return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Admin/ManageLenderComplaints/`+loaneeid+"/"+complaintsID,{}).subscribe(
      {
        next:(res)=>{

        this.spinner.hide()

        resolve()
                    },
        error:(err)=>{

        this.spinner.hide()
        ;
          }
        }
      )
    }
  )

}

}
