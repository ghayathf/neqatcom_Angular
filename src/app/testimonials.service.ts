import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService) { }
  progressBarVisible: boolean = true;
  Testimonials: any
  GetAllTestimonials() {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Testimonial/GetAllTestimonials`).subscribe(
        {
          next: (res) => {
            this.Testimonials = res
            this.progressBarVisible = false
            resolve()

          },
          error: (err) => {
            this.progressBarVisible = false
          }
        }
      )
    }
    )


  }



  AccetpedTestimonialsHome: any
  GetAcceptedTestimonialsHome() {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Testimonial/GetTestimonialAccepted`).subscribe(
        {

          next: (res) => {
            this.AccetpedTestimonialsHome = res
            this.progressBarVisible = false

            resolve()

          },
          error: (err) => {
            this.progressBarVisible = false
          }
        }
      )
    }
    )


  }



  AccetpedTestimonials: any
  GetAcceptedTestimonials() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Testimonial/AccpetedTestimonial`).subscribe(
        {

          next: (res) => {
            this.AccetpedTestimonials = res
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




  async UpdateRequest(Request: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      Request.testimonialstatus = 1;
      this.http.put(`${environment.apiUrl}/Testimonial/UpdateTestimonial`, Request).subscribe(
        {
          next: () => {
            this.spinner.hide();
            resolve();
          },
          error: () => {
            this.spinner.hide();
          }
        }
      )
    }
    )
  }


  DeleteMessage(messageId: number) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
      this.http.delete(`${environment.apiUrl}/Testimonial/DeleteTestimonial/` + messageId).subscribe(
        {
          next: () => {
            this.spinner.hide();
            resolve();
          },
          error: () => {
            this.spinner.hide();
          }
        }
      )
    })
  }



  CreateTestimonial(message: any) {
    message.testimonialstatus = 0;
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/Testimonial/CreateTestimonial`, message).subscribe(
        {
          next: () => {
            this.progressBarVisible = false
            resolve();
          },
          error: () => {
            this.progressBarVisible = false
          }
        }
      )
    })
  }
}
