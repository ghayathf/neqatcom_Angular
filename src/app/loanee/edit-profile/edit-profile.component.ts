import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Chart } from 'chart.js';
declare const zingchart: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  constructor(public userService: UserService, public router: Router) {}
  UpdateForm = new FormGroup({
    userid: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phonenum: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    userimage: new FormControl(''),
  });

  get FirstName(): FormControl {
    return this.UpdateForm.get('firstname') as FormControl;
  }
  get LastName(): FormControl {
    return this.UpdateForm.get('lastname') as FormControl;
  }
  get Adderss(): FormControl {
    return this.UpdateForm.get('address') as FormControl;
  }
  userId: any;
  userImage: any;
  async ngOnDestroy() {
    this.userService.progressBarVisible = true;
  }
  async ngOnInit() {
    let user: any = await localStorage.getItem('user');
    user = await JSON.parse(user);
    this.userId = await parseInt(user.Userid);
    await this.userService.GetUserById(this.userId);
    console.log(this.userService.userById.creditscore);
    await this.UpdateForm.patchValue(this.userService.userById);
    this.userImage = this.userService.userById.userimage;

    this.creditS = localStorage.getItem('CreditScore');
    const myConfig = {
      type: 'gauge',
      globals: {
        fontSize: 10,
      },
      plotarea: {
        marginTop: 80,
      },
      plot: {
        size: '100%',
        valueBox: {
          placement: 'center',
          text: '%v',
          fontSize: 10,
          rules: [
            {
              rule: '%v >= 8',
              text: 'High',
            },
            {
              rule: '%v >= 4 && %v < 8',
              text: 'Medium',
            },
            {
              rule: '%v < 4',
              text: 'Low',
            },
          ],
        },
      },
      backgroundColor: 'transparent',
      tooltip: {
        borderRadius: 5,
      },
      scaleR: {
        aperture: 180,
        minValue: 0,
        maxValue: 10,
        step: 1,
        center: {
          visible: false,
        },
        tick: {
          visible: false,
        },
        item: {
          offsetR: 0,
          rules: [
            {
              rule: '%i == 9',
              offsetX: 15,
            },
          ],
        },
        labels: ['0', '', '', '', '', '', '', '', '', '', '10'],
        ring: {
          size: 15,
          rules: [
            {
              rule: '%v <= 3',
              backgroundColor: 'red',
            },
            {
              rule: '%v > 3 && %v <= 7',
              backgroundColor: 'yellow',
            },
            {
              rule: '%v >= 8',
              backgroundColor: 'green',
            },
          ],
        },
      },
      refresh: {
        type: 'feed',
        transport: 'js',
        url: 'feed()',
        interval: 1500,
        resetTimeout: 1000,
      },
      series: [
        {
          values: [parseInt(this.creditS)],
          backgroundColor: 'black',
          indicator: [10, 10, 10, 10, 0.75],
          animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 900,
          },
        },
      ],
    };

    zingchart.render({
      id: 'myChart',
      data: myConfig,
      height: 250,
      width: '100%',
    });
  }
  creditS: any;
  updateInfo() {
    this.UpdateForm.controls['userid'].setValue(this.userId);
    this.UpdateForm.controls['role'].setValue('Loanee');
    this.userService.UpdateUser(this.UpdateForm.value);

    this.ngOnInit();
  }
  UploadImage(input: any) {
    if (input.files[0] != null) {
      let uplodedFile = input.files[0]; // image fille
      let formdata = new FormData();
      formdata.append('file', uplodedFile);
      this.userService.UploadImage(formdata);
    }
    this.ngOnInit();
  }

  get UserName(): FormControl {
    return this.UpdateForm.get('username') as FormControl;
  }

  get Email(): FormControl {
    return this.UpdateForm.get('username') as FormControl;
  }

  get PhoneNumber(): FormControl {
    return this.UpdateForm.get('phonenum') as FormControl;
  }
}
