import { Component, OnInit } from '@angular/core';
import { SpecService } from '../spec.service';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-doctor',
  templateUrl: './other-doctor.component.html',
  styleUrls: ['./other-doctor.component.css']
})
export class OtherDoctorComponent implements OnInit {

  constructor(private specServis : SpecService, private userServis : UserService, private router : Router) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = user.type == 1 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
  }

  name : string = ""
  cost : number = null
  duration : number = null
  message : string = ""
  messageSuccessful : string = ""

  send(){
    this.messageSuccessful =""
    if (this.name == "" || this.cost == null || this.duration == null){
      this.message = "You must enter all data!"
      return
    }
    let userJSON = localStorage.getItem("loggedUser")
    let user = JSON.parse(userJSON)
    let spec = user.specialization;
    this.specServis.addReqForExam(this.name, this.cost, this.duration, spec).subscribe((res) => {
      this.message = ""
      this.messageSuccessful = "Your request has been sent successfully!"
    })

  }

}
