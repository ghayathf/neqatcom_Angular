import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmailsService } from './emails.service';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  random: any;
  m: any;
  s: any;
  progressBarVisible: boolean = true;
  constructor(
    public EmailService: EmailsService,
    public http: HttpClient,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  login(user: any, randomsystem: number, randomuser: number) {
    return new Promise<void>((resolve, reject) => {
      const header = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const Options = {
        headers: new HttpHeaders(header),
      };
      this.http
        .post(`${environment.apiUrl}/User/login`, user, Options)
        .subscribe({
          next: (res: any) => {
            let data: any = jwt_decode(res);
            // localStorage.setItem('token', res);
            // localStorage.setItem('user', JSON.stringify(data));

            this.progressBarVisible = false;
            if (randomsystem == randomuser) {
              if (data.Role == 'Admin') {
                localStorage.setItem('token', res);
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem(
                  'AdminFname',
                  JSON.stringify(data.Firstname)
                );
                localStorage.setItem('AdminEmail', JSON.stringify(data.Email));
                localStorage.setItem(
                  'AdminLname',
                  JSON.stringify(data.Lastname)
                );

                this.router.navigate(['Admin/']);
              }
              if (data.Role == 'Lender' && JSON.parse(data.RegisterStatus)==1) {
                localStorage.setItem('token', res);
                localStorage.setItem('user', JSON.stringify(data));
                debugger
                localStorage.setItem('Lenderid', JSON.parse(data.Lenderid));
                localStorage.setItem(
                  'lenderName',
                  JSON.stringify(data.Firstname)
                );
                localStorage.setItem('lenderEmail', JSON.stringify(data.Email));
                localStorage.setItem(
                  'lenderLname',
                  JSON.stringify(data.Lastname)
                );
                localStorage.setItem(
                  'lenderImage',
                  JSON.stringify(data.Imagename)
                );
                this.router.navigate(['lenderstore/']);
              }
              else{
              this.toastr.error('Pending Request');

              }

              if (data.Role == 'Loanee') {
                localStorage.setItem('token', res);
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem(
                  'LoaneeName',
                  JSON.stringify(data.Firstname)
                );
                localStorage.setItem('Loaneeid', JSON.parse(data.Loaneeid));
                localStorage.setItem(
                  'LoaneeLastName',
                  JSON.stringify(data.Lastname)
                );
                localStorage.setItem('LoaneeEmail', JSON.stringify(data.Email));
                localStorage.setItem('LoaneeID', JSON.parse(data.Loaneeid));
                localStorage.setItem(
                  'CreditScore',
                  JSON.parse(data.CreditScore)
                );

                this.router.navigate(['Loanee/']);
              }
              // if(data.Role == "Loanee"){
              //   this.router.navigate(['loanee/'])
              // }
            } else {
              this.toastr.error('Code is error');
            }
            resolve();
          },

          error: (err) => {
            this.spinner.hide();
            this.toastr.error('Invalid user or password');
          },
        });
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
