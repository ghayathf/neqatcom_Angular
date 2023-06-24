import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { BackgroundServiceService } from 'src/app/background-service.service';
import { EmailsService } from 'src/app/emails.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public aFormGroup!: FormGroup;
  @ViewChild('TwoFactor') twofactor: any;
  constructor(
    private EmailService: EmailsService,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private backgroundService: BackgroundServiceService

  ) { }

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    // recaptcha: new FormControl('', [Validators.required]),
  });

  FactorForm: FormGroup = new FormGroup({
    code: new FormControl(''),
  });
  code: number | any;

  siteKey: any;

  async ngOnInit() {
    this.siteKey = '6LcAVagmAAAAAE8b5gCxb4tSE4Bh57fhTOPdplm-';
    await this.backgroundService.startBackgroundTask();
    await this.backgroundService.stopBackgroundTask();

  }
  // Login() {
  //   this.auth.login(this.LoginForm.value)
  // }

  get email(): FormControl {
    return this.LoginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.LoginForm.get('password') as FormControl;
  }
  get Email(): FormControl {
    return this.LoginForm.get('email') as FormControl;
  }

  random: any;
  s: any;
  m: any;
  selectedMail: any;

  async openFactorDialog() {
    const min = 1000; // Minimum value for a four-digit number
    const max = 9999; // Maximum value for a four-digit number

    this.random = Math.floor(Math.random() * (max - min + 1)) + min;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30%';
    dialogConfig.height = '350px';
    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.panelClass = 'mat-dialog-container';
    this.s = 'Two Factor Authentication ';
    this.m =
      'This is the 4 digits code is required to access your account ' +
      this.random +
      ',Thank you for your time.';
    this.dialog.open(this.twofactor, dialogConfig);
    this.selectedMail = this.LoginForm.get('email')?.value;
    await this.sendEmail(this.selectedMail, this.m, this.s);
  }
  async sendEmail(email: string, mess: string, sub: string) {
    const emailParams = {
      toemail: email,
      subject: sub,

      message: mess,
    };

    await this.EmailService.SentEmail(emailParams);
  }

  async CheckUser() {
    // this.code = this.FactorForm.get('code')?.value;
    await this.auth.login(this.LoginForm.value, this.random, this.code);
    await this.ngOnInit();
    await this.dialog.closeAll();
  }
}
