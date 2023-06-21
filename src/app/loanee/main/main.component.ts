import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LenderStoreService } from 'src/app/lender-store.service';
import { LoanService } from 'src/app/loan.service';
import { OfferService } from 'src/app/offer.service';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
import { JoyrideService }from 'ngx-joyride';
import { DocumentService } from 'ngx-joyride';
import { DomRefService } from 'ngx-joyride';
// import { SpeechClient } from '@google-cloud/speech';
// const client = new SpeechClient({
//   keyFilename: '/path/to/service-account-key.json' // Replace with the path to your service account key file
// });

declare const webkitSpeechRecognition: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('LenderInfo') LendInfo: any
  @ViewChild('ConfirmationBox') ConfirmationBox: any
  recognition: any;
  // transcription = '';

  constructor(public joyride: JoyrideService,public offerService: OfferService, public loanservice: LoanService, public lenderService: LenderStoreService, public userService: UserService,
    public dialog: MatDialog) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        this.transcription += transcript;
      };
  }
  Offers: any
  loaneeid: any
  async ngOnInit() {
    await this.offerService.GetOffersForMain()
    this.Offers = this.offerService.MainOffers
    this.loaneeid = await localStorage.getItem("Loaneeid")
    console.log(this.loaneeid);
    console.log(this.Offers);
    // this.tour()
  }
  async ngOnDestroy(){
    this.offerService.progressBarVisible = true;
  }
  // Name = 'Angular';
  tour(){
    this.joyride.startTour(
      { steps: [
       'secondstep',
      'forthstep',
      'thirdstep',
    'fifthstep',
  'sixthstep']
      }
    )
  }
  selectedLoaneeId: any
  selectedLenderId: any
  lendinfo: any
  image: any
  name: any
  url: any
  email: any
  phonenum: any
  address: any
  rate: any
  followFlag: any
  UnFollowFlag: any
  followers: any
  filterd: any
  lenderId: any
  feedback: any
  async OpenDetailsDialog(lendId: any) {
    this.lenderId = lendId
    await this.lenderService.GetLenderInfo(lendId);
    console.log(this.lenderService.LenderInfo);

    this.lendinfo = this.lenderService.LenderInfo
    this.image = this.lendinfo.userimage
    this.name = this.lendinfo.firstname
    this.url = this.lendinfo.siteurl
    this.feedback = this.lendinfo.feedBack
    this.email = this.lendinfo.email
    this.phonenum = this.lendinfo.phonenum
    this.address = this.lendinfo.address
    this.rate = this.lendinfo.avG_FEEDBACK
    await this.userService.GetFollowers(lendId)
    this.followers = this.userService.LenderFollowers
    this.filterd = this.followers.find((x: any) => x.lenderid == lendId && x.loaneeid == this.loaneeid)
    if (this.filterd == null) {
      this.UnFollowFlag = false
      this.followFlag = true
    }
    else {
      this.UnFollowFlag = true
      this.followFlag = false
    }

    console.log(localStorage.getItem('Loaneeid'));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1200px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    await this.dialog.open(this.LendInfo, dialogConfig);
  }
  async toggleFollow() {
    if (this.followFlag) {
      await this.userService.AddFollower(this.lenderId, localStorage.getItem('Loaneeid'));
      console.log("Followed")
    } else {
      await this.userService.DeleteFollower(this.lenderId, localStorage.getItem('Loaneeid'));
      console.log("UnFollowed")
    }

    this.followFlag = !this.followFlag;
    this.UnFollowFlag = !this.UnFollowFlag;
  }


  // searchText: string = '';
  // onSearchTextEntered(searchValue: string) {
  //   this.transcription = searchValue;
  // }


  // searchText2: string = '';
  // onSearchTextEntered2(searchValue2: string) {
  //   this.searchText2 = searchValue2;
  // }

  selectedofferid: any
  selectedtotalmonths: any
  RequestLoan(offerid: any, totalmonths: any) {
    this.selectedofferid = offerid;
    this.selectedtotalmonths = totalmonths
    const dialogConfig = new MatDialogConfig();
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.dialog.open(this.ConfirmationBox, dialogConfig)


    Swal.fire({
      title: '<h1 style="color: white;">Requesting</h1>',
      html: '<span style="color: white;">Do You Want to Request This Offer?</span>',

      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm-button',
        cancelButton: 'swal-custom-cancel-button',
      }, confirmButtonColor: '#87adbd',
      background: '#3e3e40',
    }).then((result) => {
      if (result.isConfirmed) {
        // DeleteOffer() logic goes here
        this.RequestSelectedOffer();
      } else {
        this.dialog.closeAll();
      }
    });
    this.dialog.closeAll();
 this.ngOnInit()
  }
  getStarsArray(feedbackNumber: number): number[] {
    return Array(feedbackNumber).fill(0).map((_, index) => index + 1);
  }

  async RequestSelectedOffer() {

    this.ngOnInit()
    this.dialog.closeAll();

    await this.loanservice.requestNewLoan(this.loaneeid, this.selectedofferid, this.selectedtotalmonths);
    this.dialog.closeAll();
await this.ngOnInit()

  }
  getStarArray(length: number): any[] {
    return Array(length).fill(0);
  }
  // startRecognition(): void {
  //   this.transcription = '';
  //   this.recognition.start();
  // }

  // stopRecognition(): void {
  //   console.log(this.transcription);
  //   this.recognition.stop();
  // }
  startTour()
  {
    this.tour()
  }
  searchText: string = '';
transcription: string = '';
onSearchTextEntered(searchValue: string) {
  this.searchText = searchValue;
}

startRecognition(): void {
  this.transcription = '';
  this.recognition.start();
}

stopRecognition(): void {
  console.log(this.transcription);
  this.recognition.stop();
}

returnAllOffers(): void {
  this.searchText = '';
  this.transcription = '';
}
}
