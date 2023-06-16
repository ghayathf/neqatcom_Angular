import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NotificationsService } from 'src/app/notifications.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-lender-header',
  templateUrl: './lender-header.component.html',
  styleUrls: ['./lender-header.component.css']
})
export class LenderHeaderComponent {
  constructor(public userService: UserService,public auth:AuthService,public notification: NotificationsService) { }
  userId: any
  userImage: any
  firstName:any
  lastName:any
  Email:any
  async ngOnInit() {
    let user: any = await localStorage.getItem('user')
    user = await JSON.parse(user)
    this.userId = await parseInt(user.Userid)
    await this.userService.GetUserById(this.userId)
    this.userImage = this.userService.userById.userimage
    this.firstName = localStorage.getItem("lenderName")?.toString().replace(/['"]+/g, '');
    this.lastName = localStorage.getItem("lenderLname")?.toString().replace(/['"]+/g, '');
    this.Email = localStorage.getItem("lenderEmail")?.toString().replace(/['"]+/g, '');
    await this.notification.GetNotificationById(this.userId);

  }
  async delete()
  {
await this.notification.DeleteNotifications(this.userId);
await this.notification.GetNotificationById(this.userId);
  }
logout(){
  this.auth.logout()
}
}
