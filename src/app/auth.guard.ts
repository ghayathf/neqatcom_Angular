import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {

  }
  userId: any
  lenderId?: number;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token')
    let user: any = localStorage.getItem('user')
    user = JSON.parse(user)
    if (token) {
      if (state.url.includes('Admin')) {
        if (user.Role == 'Admin') {
          this.userId = parseInt(user.Userid)

          return true
        }
        else {
          this.toastr.error("This Page For Admin")
          this.router.navigate([''])
          return false
        }
      }
      else if (state.url.includes('Loanee')) {
        if (user.Role == 'Loanee') {
          this.userId = parseInt(user.Userid)

          return true
        }
        else {
          this.toastr.error("This Page For Loanee")
          this.router.navigate([''])
          return false
        }
      }
      else if (state.url.includes('lenderstore')) {
        if (user.Role == 'Lender') {
          this.userId = parseInt(user.Userid)
          this.lenderId = Number(user.lenderId);
          return true
        }
        else {
          this.toastr.error("This Page For LenderStore")
          this.router.navigate([''])
          return false
        }
      }
      return true
    }
    else {
      this.toastr.error("You Are Not User (Guest)")
      this.router.navigate([''])
      return false
    }
  }

}
