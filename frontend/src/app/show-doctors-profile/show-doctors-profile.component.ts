import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Examination } from '../Model/examination';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-doctors-profile',
  templateUrl: './show-doctors-profile.component.html',
  styleUrls: ['./show-doctors-profile.component.css']
})
export class ShowDoctorsProfileComponent implements OnInit {

  constructor(private userServis : UserService, private router: Router) { }

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
    let userJSON = localStorage.getItem("otherProfileUser")
    this.user = JSON.parse(userJSON)
    this.userServis.getDoctorsExaminations(this.user.username).subscribe((data : Examination[]) => {
      this.myExaminations = data;
    })

  }

  user : User
  myExaminations : Examination[]

  makeAppointment(exam){
    this.router.navigate(['/makeAppointment',exam.name, exam.duration, this.user.username, this.user.department])
  }


  

}
