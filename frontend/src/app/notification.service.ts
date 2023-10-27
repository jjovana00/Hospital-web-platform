import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './Model/user';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http : HttpClient, private userSevice : UserService) { }

  url = 'http://localhost:4000';

  makeNotification(data){
    return this.http.post(`${this.url}/notifications/makeNotification`, data);
  }

  getUsersNotifications(username){
    const data = {
      user : username
    }
    return this.http.post(`${this.url}/notifications/getUsersNotifications`, data);
  }

  markAsRead(reciever, notification){
    const data = {
      reciever : reciever,
      notification : notification
    }
    return this.http.post(`${this.url}/notifications/markAsRead`, data);
  }
}
