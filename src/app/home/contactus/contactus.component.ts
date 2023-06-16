import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from 'src/app/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  constructor(public messageSerivce: ContactusService) { }
  CreateMessageForm: FormGroup = new FormGroup(
    {
      firstnamee: new FormControl('', Validators.required),
      lastnamee: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      emaill: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', Validators.required)
    }
  )

  get FirstName(): FormControl {
    return this.CreateMessageForm.get("firstnamee") as FormControl;
  }
  get LastName(): FormControl {
    return this.CreateMessageForm.get("lastnamee") as FormControl;
  }
  get Message(): FormControl {
    return this.CreateMessageForm.get("message") as FormControl;
  }
  get Email(): FormControl {
    return this.CreateMessageForm.get("emaill") as FormControl;
  }
  get PhoneNumber(): FormControl {
    return this.CreateMessageForm.get("phonenumber") as FormControl;
  }

  async CreateMessage() {
    this.messageSerivce.CreateMessage(this.CreateMessageForm.value);
    location.reload();
  }
}
