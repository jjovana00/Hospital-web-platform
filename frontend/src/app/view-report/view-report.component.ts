import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from '../Model/record';
import { UserService } from '../user.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  constructor(private recordService : RecordService, private router : Router,
    private route : ActivatedRoute, private userService : UserService) { }

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
      let id = params['id'];
      this.recordService.getRecordById(id).subscribe((data : Record) =>{
        this.userService.getUser(data.doctor).subscribe((u : User) =>{
          data.doctor =  u.firstname + " " + u.lastname;
        })
        this.r = data
      })
    })
  }

  r : Record = null;



}
