import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-doctors',
  templateUrl: './list-of-doctors.component.html',
  styleUrls: ['./list-of-doctors.component.css']
})
export class ListOfDoctorsComponent implements OnInit {

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
    this.userServis.getAllDoctors().subscribe((data : User[])=>
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
      this.userServis.getAllDoctors().subscribe((data : User[])=>
      {
        this.users = data;
      })
    })
  }

}
