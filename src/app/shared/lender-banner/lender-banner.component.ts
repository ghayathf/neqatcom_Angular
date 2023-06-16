import { Component } from '@angular/core';
import { LenderStoreService } from 'src/app/lender-store.service';

@Component({
  selector: 'app-lender-banner',
  templateUrl: './lender-banner.component.html',
  styleUrls: ['./lender-banner.component.css']
})
export class LenderBannerComponent {
  id: any;
  name: any;
  image: any;
  feedBack: any;
  CompanySize: any;
  showModal: boolean = false;

  constructor(private lenderService: LenderStoreService) {}

  openModal() {
    this.showModal = true;
  }

  async ngOnInit() {
    this.id = await localStorage.getItem('Lenderid');
    await this.lenderService.GetLenderInfo(this.id);
    this.name = this.lenderService.LenderInfo.firstname;
    this.image = this.lenderService.LenderInfo.userimage;
    this.feedBack = this.lenderService.LenderInfo.avG_FEEDBACK;
    this.CompanySize = this.lenderService.LenderInfo.companysize;
    console.log(this.feedBack);
  }

  getStarsArray(feedbackNumber: number): number[] {
    return Array(feedbackNumber).fill(0).map((_, index) => index + 1);
  }
}
