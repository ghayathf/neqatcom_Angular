import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';
enum CompanySize {
  SmallSize = "Small-Size",
  MidSize = "Mid-Size",
  BigSize = "Big-Size"
}
@Component({
  selector: 'app-lender',
  templateUrl: './lender.component.html',
  styleUrls: ['./lender.component.css']
})
export class LenderComponent {
  constructor(public registerService: RegisterService,private router: Router) {

   }
  companySizes: string[]= Object.values(CompanySize) as string[];

  CreateLenderStore = new FormGroup(
    {
      commercialregister: new FormControl('', [Validators.required,Validators.maxLength(14),Validators.minLength(14)]),
      companysize: new FormControl('', Validators.required),
      siteurl: new FormControl('', Validators.required),
      lenderuserid: new FormControl(''),
      bankaccount: new FormControl('', Validators.required)
    }
  )

  async ngOnInit() {
    await this.registerService.getAllUsers()
    console.log(this.registerService.lastid);

  }

  get Commercial(): FormControl {
    return this.CreateLenderStore.get('commercialregister') as FormControl;
  }
  get CompanySize(): FormControl {
    return this.CreateLenderStore.get('companysize') as FormControl;
  }
  get SiteUrl(): FormControl {
    return this.CreateLenderStore.get('siteurl') as FormControl;
  }
  get BanckAccount(): FormControl {
    return this.CreateLenderStore.get('bankaccount') as FormControl;
  }


  async CreateLender() {
    await this.registerService.getAllUsers()
    await this.CreateLenderStore.controls['lenderuserid'].setValue(this.registerService.lastid);
    await this.registerService.CreateLender(this.CreateLenderStore.value);

  }



}
