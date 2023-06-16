import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PagesService } from 'src/app/pages.service';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent {
  constructor(public pagesService:PagesService){}
  UpdateData = new FormGroup(
    {
      homeid: new FormControl(''),
      logo: new FormControl('', Validators.required),
      paragraph1: new FormControl('', Validators.required),
      paragraph2: new FormControl('', Validators.required),
      paragraph3: new FormControl('', Validators.required),
      companyaddress: new FormControl('', Validators.required),
      companyemail: new FormControl('', Validators.required),
      companyphonenumber: new FormControl('', Validators.required)
    }
  )
  async ngOnInit(){
    await this.pagesService.GetAllHomeInfo()
    this.UpdateData.patchValue(this.pagesService.Home[0])
  }
  async UpdateHome() {
    this.UpdateData.controls['homeid'].setValue(this.pagesService.Home[0].homeid);
    await this.pagesService.UpdateHome(this.UpdateData.value);
    await this.pagesService.GetAllHomeInfo();
    await this.ngOnInit()

  }

  currentImage: any
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.pagesService.UploadLogo(formdata);
    }
  }
}
