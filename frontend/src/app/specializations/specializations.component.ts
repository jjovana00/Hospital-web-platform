import { Component, OnInit } from '@angular/core';
import { SpecService } from '../spec.service';
import { Specialization } from '../Model/specialization';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-specializations',
  templateUrl: './specializations.component.html',
  styleUrls: ['./specializations.component.css']
})
export class SpecializationsComponent implements OnInit {

  constructor(private servis : SpecService, private router : Router, private userService : UserService) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    let forbidden : boolean = user.type == 2 ? false : true
    if (forbidden) {
      this.router.navigate(['/homepage'])
      return
    }
    this.servis.getAllSpecializations().subscribe((data : Specialization[]) => {
      this.specs = data;
    })
    this.newSpec = "";
  }

  specs : Specialization[] = null
  newSpec : string;

  addSpec(){
    this.servis.addNewSpec(this.newSpec).subscribe((res) =>{
      alert(res['message']);
      this.ngOnInit();
    })
  }

  acceptExam(examName, specName){
    this.servis.acceptExam(examName, specName).subscribe((res) => {
      alert(res['message'])
      this.ngOnInit();
    })
  }

  rejectExam(examName, specName){
    this.servis.deleteExam(examName, specName).subscribe((res) => {
      alert(res['message'])
      this.ngOnInit();
    })
  }

  deleteExam(examName, specName){
    this.servis.deleteExam(examName, specName).subscribe((res) => {
      this.userService.deleteExamForDoctors(examName).subscribe((res2) =>{
        if (res2['message'] == 'ok'){
          alert(res['message'])
          this.ngOnInit();
        }
      })
    })
  }

  updateExam(examName, specName){
    this.router.navigate(['updateExam', examName, specName])
  }

  addNewExam(name){
    localStorage.setItem("newExam", name);
    this.router.navigate(['/addNewExam']);
  }

  deleteSpec(id){
    this.servis.deleteSpec(id).subscribe((res)=>{
      alert(res['message'])
      this.ngOnInit();
    })
  }

}
