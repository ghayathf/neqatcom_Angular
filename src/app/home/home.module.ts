import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { ContactusComponent } from './contactus/contactus.component';
import { SearchComponent } from './search/search.component';
import { TestimonialHomeComponent } from './testimonial-home/testimonial-home.component';



@NgModule({
  declarations: [
    MainComponent,
    ContactusComponent,
    SearchComponent,
    TestimonialHomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
