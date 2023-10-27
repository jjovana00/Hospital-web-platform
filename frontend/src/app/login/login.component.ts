import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Router, Route } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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

    this.servis.login(this.username, this.password).subscribe((user : User) => {
      if (!user){
        this.message = "Wrong credentials. Try again!"
        return;
      }
      if (user.approved == 0){
        this.message = "You are not approved yet!"
        return;
      }

      localStorage.setItem("loggedUserFlag", "true");
      user.password = ""
      localStorage.setItem("loggedUser", JSON.stringify(user))
      this.servis.loginSuccessfull(user.type, user.username)
      
      this.router.navigate(['/profile']);
    })


  }

}
