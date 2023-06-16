import { Component } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { EmailsService } from 'src/app/emails.service';
import { LenderStoreService } from 'src/app/lender-store.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-lender-store-request',
  templateUrl: './lender-store-request.component.html',
  styleUrls: ['./lender-store-request.component.css']
})
export class LenderStoreRequestComponent {
  constructor(public LenderService:LenderStoreService,public adminService:AdminService,public UserService:UserService,public EmailService:EmailsService){}
  Requests:any
  Length:any
  registerd:any
  Unregistered:any
  Total:any
async ngOnInit()
{
await this.LenderService.GetLenderStoreRequest();
await this.adminService.GetLendersStatistics();
this.registerd = this.adminService.LenderStats.registeredlenderscount
this.Unregistered = this.adminService.LenderStats.unregisteredlenderscount
this.Total = this.adminService.LenderStats.totallenderscount
await (this.Requests=this.LenderService.Requests);
this.Length = this.Requests.Length
}
async sendEmail(email: string,receiver: string,mess:string,sub:string) {
  const emailParams = {
    toemail: email,
    subject: sub,
    receivername: receiver,
    message:mess
  };

  await this.EmailService.SentEmail(emailParams);
}
m:any
s:any
async DeleteRequest(UID:any,LID:any,EM:any,name:any)
{
await this.LenderService.DeleteLenderStore(LID);
await this.UserService.DeleteUser(UID);
this.s="Rejected Request"
this.m="We are sorry to let you know that your profile creation request in Neqatcom has been rejected!"
await this.sendEmail(EM,name,this.m,this.s);
await this.ngOnInit()}

async AcceptRequest(LID:any,EM:any,name:any,CR:any)
{
await this.LenderService.AcceptRequest(LID,CR);
if(this.LenderService.flag)
{
this.s="Acceptance Request"
this.m="Happy News! Welcome to our family in Neqatcom, Your company Account Creation Request has been accepted successfully,GOOD LUCK! "
await this.sendEmail(EM,name,this.m,this.s);
}
await this.ngOnInit()}
async Validate(CR:any)
{
  await this.LenderService.GetallCommercialRegister(CR);
}
}
