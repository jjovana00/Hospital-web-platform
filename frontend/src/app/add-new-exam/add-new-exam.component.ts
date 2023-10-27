import { Component, OnInit } from '@angular/core';
import { SpecService } from '../spec.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-exam',
  templateUrl: './add-new-exam.component.html',
  styleUrls: ['./add-new-exam.component.css']
})
export class AddNewExamComponent implements OnInit {

  constructor(private servis : SpecService, private router : Router) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = user.type == 2 ? false : true
    if (forbidden) {
      this.router.navigate(['/profile'])
      return
    }
    this.message = ""
    this.specialization = localStorage.getItem("newExam")
  }

  message : string
  specialization : string = "";
  name : string ="";
  duration : number = null;
  cost : number = null;

  addNewExam(){
    if (this.name == ""){
      this.message = "You must enter all data!"
    }
    if(this.cost == null){
      this.message = "You must enter all data!"
    }
    if(this.duration == null){
      this.message = "You must enter all data!"
    }
    const data = {
      name : this.name,
      cost : this.cost,
      duration : this.duration,
      specialization : this.specialization
    }

    this.servis.addNewExam(data).subscribe((res) =>{
      alert(res['message']);
      this.router.navigate(['/specializations']);
    })
  }

}
