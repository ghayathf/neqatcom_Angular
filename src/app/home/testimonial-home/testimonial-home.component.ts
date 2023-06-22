import { Component } from '@angular/core';
import { TestimonialsService } from 'src/app/testimonials.service';

@Component({
  selector: 'app-testimonial-home',
  templateUrl: './testimonial-home.component.html',
  styleUrls: ['./testimonial-home.component.css']
})
export class TestimonialHomeComponent {
  constructor(public testimonials: TestimonialsService) { }
  tests: any;
  async ngOnInit() {
    await this.testimonials.GetAcceptedTestimonialsHome();
    this.tests = this.testimonials.AccetpedTestimonialsHome;
    console.log(this.tests);

  }
  async ngOnDestroy(){
    this.testimonials.progressBarVisible = true;
  }
}
