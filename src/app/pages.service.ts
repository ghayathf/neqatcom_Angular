import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  Home:any
GetAllHomeInfo(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Home/GetAllHomeInformatio`).subscribe(
    {
      next:(res)=>{
                    this.Home=res
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
updatedFile2?: any
async UpdateHome(obj: any) {
  return new Promise<void>(async (resolve, reject) => {
  await this.GetAllHomeInfo()
  this.updatedFile2 = this.Home[0].logo;

  if (this.Filepath2 != "")
    obj.logo = this.Filepath2;
  else if (this.Home[0].logo != "") {
    obj.logo = this.Home[0].logo;

  }



    this.http.put(`${environment.apiUrl}/Home/UpdateHomePage`, obj).subscribe({
      next: () => {
        resolve();
      },
      error: (err) => {
        ;
      }
    })
  })
}

Filepath2 = "";

UploadLogo(Fille: any) {
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Home/UploadImage`, Fille).subscribe(
      {
        next: (res: any) => {
          this.spinner.hide()
          this.Filepath2 = res.logo;
          resolve()
        },
        error: () => {
          this.spinner.hide();
        }
      }


    )
  })
}
BeforeReminder:any
GetLoaneestoRemind(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Home/GetLoaneestoRemind`).subscribe(
    {
      next:(res)=>{
                    this.BeforeReminder=res
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
InPayDayReminder:any
GetLoaneesInPayDaytoRemind(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Home/GetLoaneesInPayDaytoRemind`).subscribe(
    {
      next:(res)=>{
                    this.InPayDayReminder=res
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
LateDayReminder:any
GetLoaneeslatePayDaytoRemind(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Home/GetLoaneeslatePayDaytoRemind`).subscribe(
    {
      next:(res)=>{
                    this.LateDayReminder=res
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
async UpdateBeforeReminder() {
  return new Promise<void>(async (resolve, reject) => {
    this.http.put(`${environment.apiUrl}/Home/UpdateBeforeReminder`,{}).subscribe({
      next: () => {
        resolve();
      },
      error: (err) => {
        ;
      }
    })
  })
}
async UpdateInPayDateReminder() {
  return new Promise<void>(async (resolve, reject) => {
    this.http.put(`${environment.apiUrl}/Home/UpdateInPayDateReminder`, {}).subscribe({
      next: () => {
        resolve();
      },
      error: (err) => {
        ;
      }
    })
  })
}
async UpdateLatePayDateReminder() {
  return new Promise<void>(async (resolve, reject) => {
    this.http.put(`${environment.apiUrl}/Home/UpdateLatePayDateReminder`, {}).subscribe({
      next: () => {
        resolve();
      },
      error: (err) => {
        ;
      }
    })
  })
}
CalculateCreditScores() {
  return new Promise<void>(async (resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Home/CalculateCreditScores`, {}).subscribe({
      next: () => {
        resolve();
      },
      error: (err) => {
        ;
      }
    })
  })
}CancleAuto:any
CancleLoanAutomatically(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/CancleLoanAutomatically`).subscribe(
    {
      next:(res)=>{
                    this.CancleAuto=res

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
deleteMeeting(meetingID: number) {
  return new Promise<void>((resolve, reject) => {
    this.http.delete(`${environment.apiUrl}/Meeting/DeleteMeeting/` + meetingID).subscribe(
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
CancleAutoMsgLender:any
CancleLoanAutoMsgForLender(){
  this.spinner.show()
  return new Promise<void>((resolve, reject) => {
  this.http.get(`${environment.apiUrl}/Admin/CancleLoanAutoMsgForLender`).subscribe(
    {
      next:(res)=>{
                    this.CancleAutoMsgLender=res

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
LoaneeCreditStatus: any = [];
CreditScoreStatus(laoneeid: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get("https://localhost:44397/api/Home/CreditScoreStatus/" + laoneeid).subscribe(
        (res) => {
          this.LoaneeCreditStatus = res

        },
        (err) => {
          console.log(err);
          this.spinner.hide();
        }
      )
    })
  }
}
