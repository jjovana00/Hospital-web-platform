import { Component, OnInit } from '@angular/core';
import { SpecService } from '../spec.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from '../Model/examination';
import { NotificationService } from '../notification.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit {

  constructor(private specService : SpecService, private notService : NotificationService,
     private router : Router, private route : ActivatedRoute, private userService : UserService) { }

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
    this.route.params.subscribe((params) => {
      this.spec = params['specName'];
      this.exam = params['examName'];
      this.specService.getExam(this.spec, this.exam).subscribe((e : Examination) => {
       this.examination = e
      })
    });
  }

  spec : string;
  exam : string;
  examination : Examination = null;
  newCost : number = null;
  newDuration : number = null;
  message : string;
  messageSuccess : string;

  update(){
    this.message = ""
    this.messageSuccess = ""
    if (this.newCost == null) this.newCost = this.examination.cost;
    if (this.newDuration == null) this.newDuration = 30
    this.specService.updateExam(this.spec, this.exam, this.newCost, this.newDuration).subscribe((res) =>{
      this.messageSuccess = res['message']
      let not = "Change of examination: " +  this.exam + " cost/time is changed!";
      this.userService.getAllPatients().subscribe((patients : User[]) => {
        patients.forEach(p => {
          const data = {
            reciever : p.username,
            notification : not,
            isRead : false,
            dateTime : new Date(),
          }
            this.notService.makeNotification(data).subscribe((res) => {
            
            })
        })
      })
    })
  }
}
