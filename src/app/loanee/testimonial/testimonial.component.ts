import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { TestimonialsService } from 'src/app/testimonials.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent {
  constructor(public TestimonialService: TestimonialsService, public userService: UserService, public auth: AuthGuard, public router: Router) { }
  TestimonialFrom: FormGroup = new FormGroup(
    {
      message: new FormControl('', Validators.required),
      testimonialstatus: new FormControl(''),
      userid: new FormControl('')
    })


  userid_: any;
  async ngOnInit() {
    this.userid_ = this.auth.userId;
  }
  async CreateNewTestimonial() {
    await this.TestimonialFrom.controls['userid'].setValue(this.userid_);
    this.TestimonialService.CreateTestimonial(this.TestimonialFrom.value);
await this.ngOnInit()
  }
}
