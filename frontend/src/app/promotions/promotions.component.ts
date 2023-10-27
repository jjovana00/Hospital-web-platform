import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  constructor(private notService : NotificationService,
    private router : Router, private userService : UserService) { }

 ngOnInit(): void {
   let stringUser = localStorage.getItem('loggedUser')
   let user = (stringUser == null ) ? null : JSON.parse(stringUser)
   if (!user) {
     this.router.navigate(['/homepage'])
     return
   }
   let forbidden : boolean = user.type == 2 ? false : true
   if (forbidden) {
     this.router.navigate(['/homepage'])
     return
   }
  }

  promotion : string;
  messageSuccessful : string;

  addPromotion(){
    this.messageSuccessful = ""
    this.userService.getAllPatients().subscribe((patients : User[]) => {
      patients.forEach(p => {
        const data = {
          reciever : p.username,
          notification : "New promotion: " + this.promotion,
          isRead : false,
          dateTime : new Date(),
        }
          this.notService.makeNotification(data).subscribe((res) => {
            if (res['message'] == 'ok') this.messageSuccessful = "New promotion has been posted!"
          })
      })
    })
  }

}
