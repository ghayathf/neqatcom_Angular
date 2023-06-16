import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http: HttpClient, private toaster: ToastrService, private spinner: NgxSpinnerService) { }
  CreateMessage(message: any) {
    this.spinner.show();
    this.http.post(`${environment.apiUrl}/ContactUs/CreateContactUs`, message).subscribe(
      {
        next: () => {

          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();

        }
      }
    )
  }
  AllContactUs:any
  GetAllContactUs(){
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/ContactUs/GetAllContactUs`).subscribe(
      {
        next:(res)=>{
                      this.AllContactUs=res
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
DeleteMessage(message: any) {
  this.spinner.show();
  this.http.delete(`${environment.apiUrl}/ContactUs/DeleteContactUs/`+ message).subscribe(
    {
      next: () => {

        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();

      }
    }
  )
}


}
