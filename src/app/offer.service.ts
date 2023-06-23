import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  progressBarVisible: boolean = true;
  constructor(
    public AuthGuard: AuthGuard,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  offers: any = [];
  GetAllOffers() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Offer/GetAllOffers`).subscribe(
        (res) => {
          this.offers = res;
          this.spinner.hide();
          resolve();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    });
  }

  offersById: any = [];
  GetAllOffersById(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .get(`${environment.apiUrl}/Offer/GetAllOffersById/` + id)
        .subscribe(
          (res) => {
            this.offersById = res;
            this.spinner.hide();
            resolve();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    });
  }

  Randomlyoffers: any = [];
  GetRandomlyOffer() {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Offer/GetLoansRandomly`).subscribe(
        (res) => {
          this.Randomlyoffers = res;

          this.spinner.hide();
          resolve();
        },
        (err) => {
          console.log(err);

          this.spinner.hide();
        }
      );
    });
  }

  DeleteOffer(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .delete(`${environment.apiUrl}/Offer/DeleteOffer/` + id)
        .subscribe(
          (res) => {
            resolve();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    });
  }
  updateOffer(offer: any) {
    offer.categoryid = parseInt(offer.categoryid);
    return new Promise<void>((resolve, reject) => {
      offer.lenderid = parseInt(offer.lenderid);
      this.http.put(`${environment.apiUrl}/Offer/UpdateOffer`, offer).subscribe(
        () => {
          resolve();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    });
  }

  myOffer: any = [];
  GetOfferById(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http.get(`${environment.apiUrl}/Offer/GetOfferById/` + id).subscribe(
        (res) => {
          this.myOffer = res;
          this.spinner.hide();
          resolve();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    });
  }

  MainOffers: any = [];
  GetOffersForMain() {
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Offer/GetLoaneeMain`).subscribe(
        (res) => {
          this.MainOffers = res;
          this.progressBarVisible = false;
          resolve();
        },
        (err) => {
          this.progressBarVisible = false;
        }
      );
    });
  }
  LenderOffers: any = [];
  GetOffersForLenderMain(lendId: any) {
    return new Promise<void>((resolve, reject) => {
      this.spinner.show();
      this.http
        .get(`${environment.apiUrl}/Offer/GetOffersForLenderMain/` + lendId)
        .subscribe(
          (res) => {
            this.LenderOffers = res;
            this.spinner.hide();
            resolve();
          },
          (err) => {
            this.spinner.hide();
          }
        );
    });
  }
  CreateOffer(Offer: any) {
    Offer.categoryid = parseInt(Offer.categoryid);
    return new Promise<void>((resolve, reject) => {
      Offer.lenderid = parseInt(Offer.lenderid);
      this.spinner.show();
      this.http
        .post(`${environment.apiUrl}/Offer/CreateOffer`, Offer)
        .subscribe({
          next: () => {
            this.spinner.hide();
            resolve();
          },
          error: (err) => {
            this.spinner.hide();
            console.log(err);
          },
        });
    });
  }
}
