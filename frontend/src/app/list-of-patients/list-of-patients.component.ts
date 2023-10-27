import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-patients',
  templateUrl: './list-of-patients.component.html',
  styleUrls: ['./list-of-patients.component.css']
})
export class ListOfPatientsComponent implements OnInit {

  constructor(private userServis : UserService,  private router : Router) { }

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
    this.userServis.getAllPatients().subscribe((data : User[])=>
    {
      this.users = data;
    })
  }

  users : User[];

  updateUser(username){
    localStorage.setItem("updateUser", username);
    this.router.navigate(['/updateUserMenager']);
  }

  deleteUser(id){
    this.userServis.deleteUser(id).subscribe((res)=>{
      alert(res['message'])
      this.userServis.getAllPatients().subscribe((data : User[])=>
      {
        this.users = data;
      })
    })
  }


}
