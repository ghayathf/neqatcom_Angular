import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(public userService: UserService,public auth:AuthService) { }
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
    this.firstName = localStorage.getItem("AdminFname")?.toString().replace(/['"]+/g, '');
    this.lastName = localStorage.getItem("AdminLname")?.toString().replace(/['"]+/g, '');
    this.Email = localStorage.getItem("AdminEmail")?.toString().replace(/['"]+/g, '');
  }
logout(){
  this.auth.logout()
}
}
