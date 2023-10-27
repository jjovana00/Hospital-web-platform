import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Record } from '../Model/record';
import { UserService } from '../user.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {

  constructor(private recordService : RecordService, private router : Router, private route : ActivatedRoute,
    private userService : UserService) { }

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
    this.route.params.subscribe((params) => {
      this.patient = params['patient'];
      this.recordService.getAllRecordsForPatient(this.patient).subscribe((data : Record[]) => {
        if(data.length == 0) {
          this.message = "This patient does not have records!"
          return
        }
        data.forEach(r => {
          this.userService.getUser(r.doctor).subscribe((u : User) =>{
            r.doctor = u.firstname + " " + u.lastname
          })
        });
        this.records = data
      })
    });
  }

  patient : string;
  message : string;
  records : Record[] = []

}
