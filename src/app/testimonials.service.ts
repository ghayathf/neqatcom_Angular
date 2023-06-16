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

  Testimonials: any
  GetAllTestimonials() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Testimonial/GetAllTestimonials`).subscribe(
        {
          next: (res) => {
            this.Testimonials = res
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



  AccetpedTestimonialsHome: any
  GetAcceptedTestimonialsHome() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Testimonial/GetTestimonialAccepted`).subscribe(
        {

          next: (res) => {
            this.AccetpedTestimonialsHome = res
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
    this.spinner.show();
    message.testimonialstatus = 0;
    return new Promise<void>((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/Testimonial/CreateTestimonial`, message).subscribe(
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
}
