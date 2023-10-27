import { Component, OnInit } from '@angular/core';
import { AppointementService } from '../appointement.service';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Appointment } from '../Model/appointment';
import { Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Record } from '../Model/record';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-doctors-appointments',
  templateUrl: './doctors-appointments.component.html',
  styleUrls: ['./doctors-appointments.component.css']
})
export class DoctorsAppointmentsComponent implements OnInit {

  constructor(private appService : AppointementService, private userService : UserService,
     private router : Router, private notService : NotificationService) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    this.user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!this.user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = this.user.type == 1 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    this.appService.getDoctorsFutureAppointments(this.user.username).subscribe((data : Appointment[]) => {
      if (data.length == 0){
        this.message = "You do not have any appointments in future"
        return
      }
      data.forEach((a) => {
        this.cancelMessage[data.indexOf(a)] = ""
        this.messageError[data.indexOf(a)] = ""
        a.dateTime = new Date(a.dateTime)
        this.userService.getUser(a.patient).subscribe((u : User) => {
          a.patientName = u.firstname + " " + u.lastname
        })
      })
      data.sort((a , b) => {
        if (a.dateTime > b.dateTime) return 1;
        if (a.dateTime < b.dateTime) return -1;
        return 0;
      })
      for (let i = 0; i < data.length; i++){
        this.appointments[i] = data[i]
        if (i == 2) break
      }
    })
  }

  appointments : Appointment[] = []
  user : User;
  message : string;
  cancelMessage: string[] = []
  messageError : string[] = []

  getRecords(username){
    this.router.navigate(['/patientRecords', username])
  }

  cancel(appointment){
    this.messageError[this.appointments.indexOf(appointment)] = ""
    if (this.cancelMessage[this.appointments.indexOf(appointment)] == ""){
      this.messageError[this.appointments.indexOf(appointment)] = "You need to write reason for cancellation!";
      return;
    }
    console.log(appointment.id)
    this.appService.deleteApp(appointment._id).subscribe((res) => {
      alert(res['message'])
      const data = {
        reciever : appointment.patient,
        notification : "Cancellation of " + appointment.examName + ": " + this.cancelMessage,
        isRead : false,
        dateTime : new Date(),
      }
      this.notService.makeNotification(data).subscribe((res) => {
        this.ngOnInit();
      })
    })
  }
}
