import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';
import { Examination } from '../Model/examination';
import { SpecService } from '../spec.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userServis : UserService, private router : Router, 
    private specServis : SpecService) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    this.user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!this.user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = (this.user.type == 0 || this.user.type == 1) ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    if (this.user.type == 1){
      this.userServis.getDoctorsExaminations(this.user.username).subscribe((data : Examination[]) => {
        this.myExaminations = data;
        this.specServis.getApprovedExams(this.user.specialization).subscribe((data : Examination[]) => {
          data.forEach(e => {
            let flag = false
            this.myExaminations.forEach( myE => {
              if (myE.name == e.name) {
                flag=true;
              }
            })
            if (!flag) this.otherExaminations.push(e)
          });
        })
      })
    }
  }

  user : User
  myExaminations : Examination[]
  otherExaminations : Examination[] = []
  newExam : Examination = null

  update(){
    localStorage.setItem("updateUser", this.user.username);
    this.router.navigate(['/updateUserMenager']);
  }

  addExam(){
    this.userServis.addNewExamForDoctor(this.user.username,this.newExam).subscribe((res) =>{
      alert(res['message'])
      this.otherExaminations.splice(this.otherExaminations.indexOf(this.newExam), 1)
      this.myExaminations.push(this.newExam)
    })
  }

  removeExamination(e){
    this.userServis.removeExamForDoctor(this.user.username, e.name).subscribe((res) => {
      alert(res['message'])
      this.myExaminations.splice(this.myExaminations.indexOf(e), 1)
      this.otherExaminations.push(e)
    })
  }

}
