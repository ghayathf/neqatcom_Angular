import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { LenderStoreService } from 'src/app/lender-store.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { OfferService } from 'src/app/offer.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailsService } from 'src/app/emails.service';
import { PurchasingService } from 'src/app/purchasing.service';
import { UserService } from 'src/app/user.service';
import { BackgroundServiceService } from 'src/app/background-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [{ data: [] }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor(
    public offerService: OfferService,
    public lenderService: LenderStoreService,
    public dialog: MatDialog,
    public purchasingService: PurchasingService,
    public EmailService: EmailsService,
    public userService: UserService,
    private backgroundService: BackgroundServiceService

  ) {}
  LenderPayments?: any;
  lenderID: any;
  data?: any;
  months?: any;
  offers: any;
  Followers: any;
  length: any;
  async ngOnInit() {
    await this.backgroundService.startBackgroundTask();
    await this.offerService.GetOffersForLenderMain(
      localStorage.getItem('Lenderid')
    );
    this.lenderID = localStorage.getItem('Lenderid');
    await this.lenderService.GetLenderPayments(parseInt(this.lenderID));
    await this.userService.GetFollowers(localStorage.getItem('Lenderid'));
    await this.lenderService.GetAllFollowers(localStorage.getItem('Lenderid'));
    await this.lenderService.GetLenderCounters(
      localStorage.getItem('Lenderid')
    );

    this.offers = this.offerService.LenderOffers;

    // Extract labels and data from lenderService.LenderPayments
    this.doughnutChartLabels = this.lenderService.LenderPayments.map(
      (elem: any) => elem.monthName
    );
    this.doughnutChartDatasets = [
      {
        data: this.lenderService.LenderPayments.map(
          (elem: any) => elem.totalPayments
        ),
      },
    ];

    this.Followers = this.lenderService.Followers;
    this.length = this.Followers.length;
    console.log(this.Followers);
    await this.backgroundService.stopBackgroundTask();

  }
  async ngOnDestroy() {
    this.lenderService.progressBarVisible = true;
  }
  chartContainer1: any;
  chartContainer2: any;
  async generatePDF() {
    const pdf = new jsPDF();
    this.chartContainer1 = document.getElementById('chartContainer');

    const canvas1 = await html2canvas(this.chartContainer1);
    const chartImage1 = canvas1.toDataURL('image/png');

    pdf.addImage(chartImage1, 'PNG', 10, 10, 300, 200);

    pdf.save('charts.pdf');
  }
}
