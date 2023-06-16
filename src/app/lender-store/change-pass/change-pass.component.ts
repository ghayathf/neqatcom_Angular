import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  constructor(public userService: UserService, public router: Router) { }
  userId: any
  async ngOnInit() {
    let user: any = await localStorage.getItem('user')
    user = await JSON.parse(user)
    this.userId = await parseInt(user.Userid)
  }
  PasswordForm = new FormGroup(
    {
      userid: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      password: new FormControl('', Validators.required)
    }
  )

  get Password(): FormControl {
    return this.PasswordForm.get('password') as FormControl;
  }

  async updatePassword() {
    this.PasswordForm.controls['userid'].setValue(this.userId);
    try {
      await this.userService.UpdatePass(
        this.PasswordForm.value
      );
    } catch (err) {
      console.error(err);
    }
    // this.dialog.closeAll();
await this.ngOnInit()
  }
}
