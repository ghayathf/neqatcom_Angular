import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NotificationsService } from 'src/app/notifications.service';
import { UserService } from 'src/app/user.service';
import { JoyrideService }from 'ngx-joyride';
@Component({
  selector: 'app-loaneeheader',
  templateUrl: './loaneeheader.component.html',
  styleUrls: ['./loaneeheader.component.css']
})
export class LoaneeheaderComponent {
  constructor(public joyride: JoyrideService,public authService: AuthService, public userService: UserService, public notification: NotificationsService) { }
  firstname: any;
  lastname: any;
  fullname: any;
  x: any;
  userId: any
  userImage: any
  Email: any
  Notification: any;
  async ngOnInit() {
    this.firstname = localStorage.getItem("LoaneeName")?.toString().replace(/['"]+/g, '');
    this.lastname = localStorage.getItem("LoaneeLastName")?.toString().replace(/['"]+/g, '');
    this.Email = localStorage.getItem("LoaneeEmail")?.toString().replace(/['"]+/g, '');
    this.fullname = this.firstname + " " + this.lastname;

    let user: any = await localStorage.getItem('user')
    user = await JSON.parse(user)
    this.userId = await parseInt(user.Userid)
    await this.userService.GetUserById(this.userId)
    this.userImage = this.userService.userById.userimage
await this.notification.GetNotificationById(this.userId);


this.tour()


  }
  tour(){
    this.joyride.startTour(
      { steps: ['firstStep'
       ]}
    )
  }
  async delete()
  {
await this.notification.DeleteNotifications(this.userId);
await this.notification.GetNotificationById(this.userId);
  }
  Logout() {
    this.authService.logout()
  }
}
