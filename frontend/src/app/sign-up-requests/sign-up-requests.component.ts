import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-requests',
  templateUrl: './sign-up-requests.component.html',
  styleUrls: ['./sign-up-requests.component.css']
})
export class SignUpRequestsComponent implements OnInit {

  constructor(private userServis : UserService, private router : Router) { }

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
    this.userServis.getSignUpRequests().subscribe((data : User[])=>
    {
      this.requests = data;
    })
  }

  requests : User[];

  acceptPatient(username){
    this.userServis.acceptPatient(username).subscribe((res)=>{
      alert(res['message'])
      this.userServis.getSignUpRequests().subscribe((data : User[])=>
      {
        this.requests = data;
      })
    })
  }

  rejectPatient(username){
    this.userServis.rejectPatient(username).subscribe((res)=>{
      alert(res['message'])
      this.userServis.getSignUpRequests().subscribe((data : User[])=>
      {
        this.requests = data;
      })
    })
  }

}
