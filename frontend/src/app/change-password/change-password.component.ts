import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private servis : UserService, private router : Router) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    this.username = user.username;
  }

  oldPass : string;
  newPass : string;
  newPassCon : string;
  message : string;
  username : string;

  change(){
    this.message = ""
    if (this.oldPass == "" || this.newPass == "" || this.newPassCon == ""){
      this.message = "You must enter all data!";
      return;
    }
    if (this.newPass != this.newPassCon){
      this.message = "Password confirmation does not match with the password!";
      return;
    }
    this.servis.changePassword(this.oldPass, this.newPass, this.username).subscribe((res)=>{
      if (res['message'] == 'ok'){
        alert("Password changed successfully!");
        localStorage.setItem("loggedUserFlag", "false");
        localStorage.removeItem("loggedUser");
        this.servis.logout();
        this.router.navigate(['/homepage'])
      } 
      else this.message = res['message'];
    })
  }

}
