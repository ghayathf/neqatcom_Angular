import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailsService } from 'src/app/emails.service';
import { LenderStoreService } from 'src/app/lender-store.service';
import { PurchasingService } from 'src/app/purchasing.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-my-followers',
  templateUrl: './my-followers.component.html',
  styleUrls: ['./my-followers.component.css']
})
export class MyFollowersComponent {
  constructor(public lenderService: LenderStoreService, public dialog: MatDialog,
     public purchasingService: PurchasingService, public EmailService: EmailsService,
     public userService : UserService) { }
Followers:any
length:any
  async ngOnInit() {

    await this.userService.GetFollowers(localStorage.getItem('Lenderid'))
    await this.lenderService.GetAllFollowers(localStorage.getItem('Lenderid'))
    this.Followers = this.lenderService.Followers
    this.length = this.Followers.length
    console.log(this.Followers);

  }
  async ngOnDestroy(){
    this.lenderService.progressBarVisible = true;
  }
}
