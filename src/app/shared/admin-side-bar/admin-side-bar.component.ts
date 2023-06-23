import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css'],
})
export class AdminSideBarComponent {
  constructor(public auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
