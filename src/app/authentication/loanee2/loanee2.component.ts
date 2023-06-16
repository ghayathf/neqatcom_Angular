import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'app-loanee2',
  templateUrl: './loanee2.component.html',
  styleUrls: ['./loanee2.component.css']
})
export class Loanee2Component {
  constructor(public RegisterUser: RegisterService,private router: Router) { }

  CreateLoaneeForm = new FormGroup(
    {
      nationalnumber: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]+$')]),
      dateofbirth: new FormControl('', [Validators.required, this.minimumAgeValidator]),
      salary: new FormControl('', [Validators.required]),
      numoffamily: new FormControl('', Validators.required),
      loaneeuserid: new FormControl('')
    }
  )

  get National(): FormControl {
    return this.CreateLoaneeForm.get("nationalnumber") as FormControl;
  }
  get Date(): FormControl {
    return this.CreateLoaneeForm.get("dateofbirth") as FormControl;
  }
  get Salary(): FormControl {
    return this.CreateLoaneeForm.get("salary") as FormControl;
  }
  get Number(): FormControl {
    return this.CreateLoaneeForm.get("numoffamily") as FormControl;
  }
  async CreateLoanee() {

  await  this.CreateLoaneeForm.controls['loaneeuserid'].setValue(this.RegisterUser.lastid2);
    
    await this.RegisterUser.CreateLoanee(this.CreateLoaneeForm.value);
    await this.router.navigate(['/login']);
  }
minimumAgeValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const dateOfBirth = new Date(control.value);
    const ageInYears = currentDate.getFullYear() - dateOfBirth.getFullYear();
  
    if (ageInYears < 18) {
      return { minimumAgeInvalid: true };
    }
  
    return null;
  }
  
  
}
