import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/user';
import { AppointementService } from '../appointement.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private appointemntServis : AppointementService, private router : Router) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = user.type == 0 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    this.route.params.subscribe((params) => {
      this.examName = params['examName'];
      this.examDuration = parseInt(params['duration']);
      this.doctor = params['doctor'];
      this.department = params['department']
    });
    this.user = user.username
  }

  examName : string;
  examDuration : number;
  user : string;
  doctor : string;
  department : string
  messageSuccessful : string;
  message : string;
  selectedDate : string = "";
  selectedTime : string = "";

  makeAppointment(){
    this.message = ""
    this.messageSuccessful = ""
    if (this.selectedDate == "" || this.selectedTime == ""){
      this.message = "You must eneter all data!"
      return;
    }
    const currentDate = new Date();
    const selectedDateTime = new Date(this.selectedDate + 'T' + this.selectedTime);

    if (selectedDateTime <= currentDate) {
      this.message = "You must choose date and time in future!"
      return;
    }

    this.appointemntServis.makeAppointment(this.examName, this.examDuration, this.user, this.doctor, selectedDateTime, this.department).subscribe((res)=>{
      if (res['message'] == 'ok') {
        this.message = ''
        this.messageSuccessful = "The appointment has been successfully scheduled"
      }
      else this.message = res['message']
    })
  }

}
