import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  constructor(private servis : UserService, private router : Router) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem("loggedUserFlag") == 'true'? true : false
    this.servis.getAllDoctors().subscribe((data : User[])=>
    {
      this.users = data;
      this.listOfAllUsers=data;
    })
  }

  isLogged : boolean
  listOfAllUsers : User[] = [];
  users : User[];
  desc : boolean;
  firstnameParam : string = "";
  lastnameParam : string = "";
  specParam : string = "";
  departmentParam : string = "";

  sortByFirstname(){
    this.users.sort((a,b) =>{
      if (a.firstname == b.firstname) return 0;
      if (a.firstname < b.firstname) {
        if (this.desc) return 1;
        else return -1;
      }
      else{
        if (this.desc) return -1;
        else return 1;
      }
    })
  }

  sortByLastname(){
    this.users.sort((a,b) =>{
      if (a.lastname == b.lastname) return 0;
      if (a.lastname < b.lastname) {
        if (this.desc) return 1;
        else return -1;
      }
      else{
        if (this.desc) return -1;
        else return 1;
      }
    })
  }

  sortBySpec(){
    this.users.sort((a,b) =>{
      if (a.specialization == b.specialization) return 0;
      if (a.specialization < b.specialization) {
        if (this.desc) return 1;
        else return -1;
      }
      else{
        if (this.desc) return -1;
        else return 1;
      }
    })
  }

  sortByDepartment(){
    this.users.sort((a,b) =>{
      if (a.department == b.department) return 0;
      if (a.department < b.department) {
        if (this.desc) return 1;
        else return -1;
      }
      else{
        if (this.desc) return -1;
        else return 1;
      }
    })
  }

  search(){
    if (this.firstnameParam == "" && this.lastnameParam == "" && this.specParam == "" && this.departmentParam == ""){
      this.users = this.listOfAllUsers
    } 
    else {
      let filterUsers = this.users.filter(user=> {
        let firstNameCondition = this.firstnameParam !== "" && user.firstname.includes(this.firstnameParam);
        let lastNameCondition = this.lastnameParam !== "" && user.lastname.includes(this.lastnameParam);
        let specCondition = this.specParam !== "" && user.specialization.includes(this.specParam);
        let departmentCondition = this.departmentParam !== "" && user.department.includes(this.departmentParam);
        return firstNameCondition || lastNameCondition || specCondition || departmentCondition;
      }
      );
      this.users = filterUsers;
      
    }
  }

  seeDoctorsProfile(docotor){
    docotor.password = ""
    localStorage.setItem("otherProfileUser", JSON.stringify(docotor))
    this.router.navigate(['/showDoctorsProfile'])
  }

  
  
}
