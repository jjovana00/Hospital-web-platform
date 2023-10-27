import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../Model/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private servis : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  username : string;
  password : string;
  message : string;

  login(){
    if(this.username == "" || this.password == "" || this.username == undefined  || this.password == undefined)
    {
      this.message = "Enter you credentials!";
      return;
    }

    this.servis.loginAdmin(this.username, this.password).subscribe((user : User) => {
      if (!user){
        this.message = "Wrong credentials. Try again!"
        return;
      }
      if (user.approved == 0){
        this.message = "Wrong are not approved yet!"
        return;
      }

      localStorage.setItem("loggedUserFlag", "true");
      localStorage.setItem("loggedUser", JSON.stringify(user))
      this.servis.loginSuccessfull(user.type, user.username)
      
      this.router.navigate(['/homepage']);
    })


  }

}
