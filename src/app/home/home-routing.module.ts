import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TestimonialComponent } from '../lender-store/testimonial/testimonial.component';
import { TestimonialHomeComponent } from './testimonial-home/testimonial-home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'Testimonials',
    component: TestimonialHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
