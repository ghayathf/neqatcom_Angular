import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-lender2',
  templateUrl: './lender2.component.html',
  styleUrls: ['./lender2.component.css']
})
export class Lender2Component {
  @ViewChild("ViewUsermanual") Usermanual:any

  constructor(public userService: RegisterService, private router: Router, private dialog: MatDialog) { }
  CreateUserForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email,this.checkEmailExists.bind(this)]),
      phonenum: new FormControl('',[Validators.required, Validators.minLength(9),
        Validators.maxLength(10),Validators.pattern('^[0-9]+$')]),
      firstname: new FormControl('', Validators.required),

      address: new FormControl('', Validators.required),
      role: new FormControl(''),
      termsAndConditions: new FormControl(false, Validators.requiredTrue)
    }
  )
  get Phone(): FormControl {
    return this.CreateUserForm.get('phonenum') as FormControl;
  }
  get FirstName(): FormControl {
    return this.CreateUserForm.get('firstname') as FormControl;
  }

  get Username(): FormControl {
    return this.CreateUserForm.get('username') as FormControl;
  }
  get Email(): FormControl {
    return this.CreateUserForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.CreateUserForm.get("password") as FormControl;
  }

  get Address(): FormControl {
    return this.CreateUserForm.get("address") as FormControl;
  }
  CreateUser() {
    this.userService.CreateLenderUser(this.CreateUserForm.value);
  }
  async ngOnInit()
  {
    this.userService.getAllUsers();
  }
  async ngOnDestroy(){
    this.userService.progressBarVisible = true;
  }

  checkEmailExists(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;

    if (this.userService.users && this.userService.users.some((user: any) => user.email === email)) {
      return { emailExists: true };
    }

    return null;
  }
  Openusermanual() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.backdropClass = 'backdropBackground';
    dialogConfig.width = '800px'; // Adjust the width as per your requirement

    this.dialog.open(this.Usermanual, dialogConfig);
  }
}
