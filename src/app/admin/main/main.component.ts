import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { NgChartsModule } from 'ng2-charts';
import { AdminService } from 'src/app/admin.service';
import { BackgroundServiceService } from 'src/app/background-service.service';
import { LoaneeService } from 'src/app/loanee.service';
import { TestimonialsService } from 'src/app/testimonials.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(public adminService: AdminService, public loaneeService: LoaneeService, public testimonialService: TestimonialsService,
    private backgroundService: BackgroundServiceService
    ) { }
  Actors: any
  credit: any = 0
  creditmap?: any
  actormap?: any
  AllLoanees: any
  TestimonialsLength: any
  complaints: any
  testimonials: any
  loanees: any
  lenders: any
  complaintsLength: any
  async ngAfterViewInit() {

    await this.backgroundService.startBackgroundTask();
    await this.adminService.GetCreditScoreCounterCharts();
    await this.adminService.GetActorCounterCharts();
    await this.loaneeService.GetAllLoanees()
    await this.adminService.GetAllComplaints()
    await this.testimonialService.GetAllTestimonials()
    this.Actors = this.adminService.ActorCounter;
    this.credit = this.adminService.CreditScoreCounter;
    this.creditmap = this.credit.map((elem: { creditscore: number, count: number; }) => ({ x: elem.creditscore, y: elem.count }));
    this.scatterChartDatasets[0].data = this.creditmap
    await (this.pieChartLabels = this.Actors.map(function (elem: { role: any; }) {
      return elem.role;
    }).slice(1)
    )

    this.lenders = this.Actors[1].count
    this.loanees = this.Actors[2].count
    console.log(this.lenders + "  " + this.loanees);

    await (this.actormap = this.Actors.map(function (elem: { count: any; }) { return elem.count }).slice(1))
    this.pieChartDatasets[0].data = this.actormap;


    this.testimonials = this.testimonialService.Testimonials
    this.complaints = this.adminService.complaints
    this.AllLoanees = this.loaneeService.Loanees
    this.TestimonialsLength = this.testimonials.length
    this.complaintsLength = this.complaints.length
    console.log(this.AllLoanees);
    await this.backgroundService.stopBackgroundTask();

  }
  async ngOnDestroy() {
    this.testimonialService.progressBarVisible = true
  }

  title = 'ng2-charts-demo';

  public scatterChartDatasets: ChartConfiguration<'scatter'>['data']['datasets'] = [
    {
      data: [],
      label: 'Credit Score',
      pointRadius: 10,
    }
  ];

  public scatterChartOptions: ChartConfiguration<'scatter'>['options'] = {
    responsive: false,
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: 10
      }
    }
  };


  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [];
  public pieChartDatasets = [{
    data: []
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  chartContainer1: any
  chartContainer2: any
  async generatePDF() {
    const pdf = new jsPDF();

    this.chartContainer1 = document.getElementById('chartContainer');
    this.chartContainer2 = document.getElementById('chart-container2');

    const canvas1 = await html2canvas(this.chartContainer1);
    const chartImage1 = canvas1.toDataURL('image/png');

    const canvas2 = await html2canvas(this.chartContainer2);
    const chartImage2 = canvas2.toDataURL('image/png');

    pdf.addImage(chartImage1, 'PNG', 10, 10, 300, 100);
    pdf.addImage(chartImage2, 'PNG', 10, 120, 300, 100);

    pdf.save('charts.pdf');
  }
}
