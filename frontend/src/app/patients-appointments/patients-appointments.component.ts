import { Component, OnInit } from '@angular/core';
import { AppointementService } from '../appointement.service';
import { Appointment } from '../Model/appointment';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-appointments',
  templateUrl: './patients-appointments.component.html',
  styleUrls: ['./patients-appointments.component.css']
})
export class PatientsAppointmentsComponent implements OnInit {

  constructor(private appService : AppointementService, private userService : UserService, private router : Router) { }

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
    this.appService.getPatientsAppointments(this.user.username).subscribe((data : Appointment[]) => {
      if (data.length == 0){
        this.message = "You do not have any appointments"
        return
      }
      let now = new Date()
      data.forEach((a) => {
        a.dateTime = new Date(a.dateTime)
        if (now < a.dateTime) this.futureApp.push(a)
        else this.pastApp.push(a)
        this.userService.getUser(a.doctor).subscribe((doctor : User) => {
          a.doctor = doctor.firstname + " " + doctor.lastname;
        })
      })
      this.futureApp.sort((a , b) => {
        if (a.dateTime > b.dateTime) return 1;
        if (a.dateTime < b.dateTime) return -1;
        return 0;
      })
      this.pastApp.sort((a , b) => {
        if (a.dateTime > b.dateTime) return -1;
        if (a.dateTime < b.dateTime) return 1;
        return 0;
      })
      this.flag = true;
      
    })
  }

  flag : boolean = false
  futureApp : Appointment[] = []
  pastApp : Appointment[] = []
  user : User;
  message : string;

  cancel(a){
    this.appService.deleteApp(a._id).subscribe((res)=>{
      alert(res['message'])
      this.futureApp.splice(this.futureApp.indexOf(a), 1)
      if (this.futureApp.length == 0) this.message = "You do not have any appointments"
    })
  }

  viewReport(id){
    this.router.navigate(['/viewReport', id])
  }

}
