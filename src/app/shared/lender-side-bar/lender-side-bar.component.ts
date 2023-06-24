import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-lender-side-bar',
  templateUrl: './lender-side-bar.component.html',
  styleUrls: ['./lender-side-bar.component.css'],
})
export class LenderSideBarComponent {
  constructor(public router: Router, public auth: AuthService) {}
  GetOffers() {
    this.router.navigate(['/lenderstore/']);
  }
  logout() {
    this.auth.logout();
  }
}
