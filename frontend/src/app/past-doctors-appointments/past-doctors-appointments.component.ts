import { Component, OnInit } from '@angular/core';
import { AppointementService } from '../appointement.service';
import { UserService } from '../user.service';
import { Appointment } from '../Model/appointment';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-past-doctors-appointments',
  templateUrl: './past-doctors-appointments.component.html',
  styleUrls: ['./past-doctors-appointments.component.css']
})
export class PastDoctorsAppointmentsComponent implements OnInit {

  constructor(private appService : AppointementService, private userService : UserService, private router : Router) { }

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
    this.appService.getDoctorsPastAppointments(this.user.username).subscribe((data : Appointment[]) => {
      if (data.length == 0){
        this.message = "You do not have any appointment that do not has review!"
        return
      }
      data.forEach((a) => {
        a.dateTime = new Date(a.dateTime)
        this.userService.getUser(a.patient).subscribe((u : User) => {
          a.patientName = u.firstname + " " + u.lastname
        })
      })
      data.sort((a , b) => {
        if (a.dateTime > b.dateTime) return -1;
        if (a.dateTime < b.dateTime) return 1;
        return 0;
      })
      this.appointments = data
    })
  }

  appointments : Appointment[] = [] 
  user : User;
  message : string;

  makeReview(a){
    this.router.navigate(['/makeReview',a.id, a.patient])
  }

}
