import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { AppointementService } from '../appointement.service';

@Component({
  selector: 'app-make-review',
  templateUrl: './make-review.component.html',
  styleUrls: ['./make-review.component.css']
})
export class MakeReviewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recordService : RecordService,
     private router : Router, private userService : UserService, private appService : AppointementService) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    this.doctor = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!this.doctor) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = this.doctor.type == 1 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    this.route.params.subscribe((params) => {
      this.appointmentId = parseInt(params['id']);
      this.patient = params['patient'];
      console.log(this.patient)
      this.userService.getUser(this.patient).subscribe((u : User) => {
        this.patientName = u.firstname + " " + u.lastname;
      })
    });
  }

  appointmentId : number
  doctor : User;
  patient : string;
  patientName : string = null
  reasonForVisit : string = "";
  diagnosis : string = ""
  prescribedTherapy : string = ""
  nextDate : string = "";
  nextTime : string = "";
  messageSuccessful : string;
  message : string;


  makeReview(){
    this.message = ""
    this.messageSuccessful = ""
    if (this.nextDate == "" || this.nextTime == "" || this.reasonForVisit == "" ||
      this.diagnosis == "" || this.prescribedTherapy == ""){
      this.message = "You must eneter all data!"
      return;
    }
    const currentDate = new Date();
    const nextDateTime = new Date(this.nextDate + 'T' + this.nextTime);

    if (nextDateTime <= currentDate) {
      this.message = "You must choose date and time in future!"
      return;
    }

    this.recordService.makeReview(this.appointmentId, this.doctor.username, this.doctor.specialization,
      this.patient, currentDate, this.reasonForVisit, this.diagnosis, this.prescribedTherapy, nextDateTime ).subscribe((res)=>{
      if (res['message'] == 'ok') {
        this.appService.setHasReview(this.appointmentId).subscribe((res) => {
          if (res[this.message] != 'ok') return
        })
        this.message = ''
        this.messageSuccessful = "Review has been made successfully!"
      }
      else this.message = res['message']
    })
  }

}
