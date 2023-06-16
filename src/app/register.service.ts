import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { environment } from '.././environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  tr: any;
  tr2: any;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router, private toaster: ToastrService,
    private userService:UserService) {
    this.tr = []
    this.tr2 = []
  }
  CreateLenderUser(User: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
    User.role = "Lender";
    this.http.post(`${environment.apiUrl}/User/CreateUser`, User).subscribe(
      {
        next: async (res) => {
          this.spinner.hide();
          await this.getAllUsers();
          this.router.navigate(['/login']);
        },
        error: () => {
          this.spinner.hide();
        }
      }
    )})
  }

  CreateLoaneeUser(User: any) {
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
    User.role = "Loanee";
    this.http.post(`${environment.apiUrl}/User/CreateUser`, User).subscribe(
      {
        next: async (res) => {
          this.spinner.hide();
          this.getAllUsers2();
          await this.router.navigate(['/loaneeInfo']);
        },
        error: () => {
          this.spinner.hide();
        }
      }
    )})
  }

 async CreateLender(Lender: any) {
debugger
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
    Lender.lenderuserid = this.lastid
    this.http.post(`${environment.apiUrl}/LenderStore/createLenderStore`, Lender).subscribe(
      {
        next: async () => {
          this.spinner.hide();
          await this.router.navigate(['/login']);
        },
        error: (err) => {
          this.spinner.hide();
          ;

        }
      }
    )})
  }
  nn:any
  lastidd:any
  async CreateLoanee(Loanee: any) {
    await this.getAllNationalNumbers()
    this.nn = this.NationalNumbers.find((x:any)=>x.nationalnum == Loanee.nationalnumber)

    if(this.nn!=null){
    this.spinner.show();
    return new Promise<void>((resolve, reject) => {
    this.http.post(`${environment.apiUrl}/Loanee/CreateLoanee`, Loanee).subscribe(

      {

        next: () => {

          this.spinner.hide();
        },
        error: (err) => {

          this.spinner.hide();

        }
      }
    )})}
    else{
      this.toaster.error("Your National number does not exist !")
      this.filterUsers();
          const maxId = Math.max(...this.tr.map((user: { userid: any; }) => user.userid));
          this.lastidd = maxId
          this.userService.DeleteUser(this.lastidd)
    }
  }



  lenderUsers: any[] = [];
  users: any = []
  lastid: any;
  async getAllUsers() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
    this.http.get(`${environment.apiUrl}/User/GetAllUsers`).subscribe(
      {
        next: (res) => {
          this.users = res
          this.spinner.hide();
          this.filterUsers();
          this.extractLenderUsers();
          const maxId = Math.max(...this.tr.map((trainer: { userid: any; }) => trainer.userid));
          this.lastid = maxId

          resolve()
        },
        error: (err) => {
          this.spinner.hide()
          ;
        }
      }
    )})
  }
  extractLenderUsers() {
    this.lenderUsers = this.users.filter((user: { role: string; }) => user.role === 'Lender');
  }
  users2: any = []
  lastid2: any;
  async getAllUsers2() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/User/GetAllUsers`).subscribe(
        {
          next: (res) => {
            this.users2 = res
            this.spinner.hide();
            this.filterUsers2();
            const maxId = Math.max(...this.tr2.map((trainer: { userid: any; }) => trainer.userid));
            this.lastid2 = maxId

            resolve();
          },
          error: (err) => {
            this.spinner.hide()
            ;
          }
        }
      )
    })
  }
  NationalNumbers: any;
  async getAllNationalNumbers() {
    this.spinner.show()
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/Loanee/GetAllGpnationalnumber`).subscribe(
        {
          next: (res) => {
            this.NationalNumbers = res
            // this.spinner.hide();
            // this.filterUsers2();
            // const maxId = Math.max(...this.tr2.map((trainer: { userid: any; }) => trainer.userid));
            // this.lastid2 = maxId
            resolve();
          },
          error: (err) => {
            this.spinner.hide()
            ;
          }
        }
      )
    })
  }
  filterUsers() {
    this.tr = this.users.filter((x: { role: string; }) => x.role == "Lender")
  }
  filterUsers2() {
    this.tr2 = this.users2.filter((x: { role: string; }) => x.role == "Loanee")
  }

}
