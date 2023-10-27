import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, private userServis : UserService) { }

  logged : boolean = false;
  type : number = -1;
  username : string = "";


  ngOnInit(): void {
    this.userServis.isLoggedIn$.subscribe((loggedIn) => {
      this.logged = loggedIn;
    });
    this.userServis.loggedInType$.subscribe((type) => {
      this.type = type;
    });
    this.userServis.loggedInUsername$.subscribe((username) => {
      this.username = username;
    });
  }

  
  logout(){
    localStorage.setItem("loggedUserFlag", "false");
    localStorage.removeItem("loggedUser");
    this.userServis.logout();
    this.router.navigate(['/homepage']);
  }

}
