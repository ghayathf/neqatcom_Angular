import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  constructor(public userService: UserService, public router: Router) {}
  userId: any;
  async ngOnInit() {
    let user: any = await localStorage.getItem('user');
    user = await JSON.parse(user);
    this.userId = await parseInt(user.Userid);
  }
  PasswordForm = new FormGroup({
    userid: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      this.checkPassword.bind(this),
    ]),
  });

  get Password(): FormControl {
    return this.PasswordForm.get('password') as FormControl;
  }

  async updatePassword() {
    this.PasswordForm.controls['userid'].setValue(this.userId);
    try {
      await this.userService.UpdatePass(this.PasswordForm.value);
    } catch (err) {
      console.error(err);
    }
    await this.ngOnInit();
  }
  checkPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (password.length < 8) {
      return { passwordTooShort: true };
    }

    if (!/[A-Z]/.test(password)) {
      return { passwordNoCapitalLetter: true };
    }

    if (!/[a-z]/.test(password)) {
      return { passwordNoSmallLetter: true };
    }

    if (!/\d/.test(password)) {
      return { passwordNoDigit: true };
    }

    return null; // Password is valid
  }
}
