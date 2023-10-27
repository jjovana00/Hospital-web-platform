import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user';
import { NotificationService } from '../notification.service';
import { Notification } from '../Model/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private router : Router, private notService : NotificationService) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    this.user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!this.user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = this.user.type == 0 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    this.notService.getUsersNotifications(this.user.username).subscribe((data : Notification[]) =>{
      if (data.length == 0) {
        this.message = "You do not have notifications!"
        return;
      }
      data.sort((a,b) =>{
        if (a.isRead == true && b.isRead == false) return 1;
        if (a.isRead == false && b.isRead == true) return -1;
        if (a.dateTime < b.dateTime) return 1;
        if (a.dateTime > b. dateTime) return -1;
        return 0;
      })
      this.notifications = data;
    })
  }

  user : User;
  notifications : Notification[];
  message : string;

  markAsRead(n){
    this.notService.markAsRead(n.reciever, n.notification).subscribe((res) => {
      if (res['message'] == 'ok') this.ngOnInit()
    })
  }

}
