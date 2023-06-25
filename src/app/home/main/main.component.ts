import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmailsService } from 'src/app/emails.service';
import { LoanService } from 'src/app/loan.service';
import { OfferService } from 'src/app/offer.service';
import { PagesService } from 'src/app/pages.service';
import { TestimonialsService } from 'src/app/testimonials.service';
import { Chart, registerables } from 'chart.js';
import { AdminService } from 'src/app/admin.service';
import { BackgroundServiceService } from 'src/app/background-service.service';
declare const feed: any;
declare const zingchart: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  chart!: Chart;
  constructor(
    public adminService: AdminService,
    private Testimonials: TestimonialsService,
    public offerService: OfferService,
    public pagesService: PagesService,
    public EmailService: EmailsService,
    public loanService: LoanService,
    private backgroundService: BackgroundServiceService
  ) {}
  m: any;
  s: any;
  Accepted: any;
  Offers: any;
  async ngOnInit() {
   
    await this.Testimonials.GetAcceptedTestimonials();
    await this.offerService.GetRandomlyOffer();
    this.Offers=this.offerService.Randomlyoffers;
    this.Accepted = this.Testimonials.AccetpedTestimonials;
    console.log(this.Accepted);
    await this.backgroundService.startBackgroundTask();
      }
  searchText: string = '';
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
 async ngOnDestroy() {
    this.pagesService.progressBarVisible = true;
  }
  updateChartValue(value: number) {
    this.chart.data.datasets[0].data = [value];
    this.chart.update();
  }
}
