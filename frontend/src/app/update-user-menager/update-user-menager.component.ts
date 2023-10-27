import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user-menager',
  templateUrl: './update-user-menager.component.html',
  styleUrls: ['./update-user-menager.component.css']
})
export class UpdateUserMenagerComponent implements OnInit {

  constructor(private userServis : UserService, private router : Router) { }

  ngOnInit(): void {
    let stringUser = localStorage.getItem('loggedUser')
    let user = (stringUser == null ) ? null : JSON.parse(stringUser)
    if (!user) {
      this.router.navigate(['/homepage'])
      return
    }
    this.storageUsername = localStorage.getItem("updateUser");
    this.userServis.getUser(this.storageUsername).subscribe((data : User) => {
       this.user = data
    })
  }
  storageUsername : string;
  user : User;
  firstname : string = "";
  lastname : string = "";
  adress : string = "";
  telephone : string = "";
  message : string;
  messageSuccess : string;
  isImageValid :boolean;
  licenceNum : string = ""
  department : string = ""
  file : File = null;

  onChange(event) {
    this.isImageValid = true;
    this.file = event.target.files[0];

  
    if(this.file.type === 'image/jpeg' || this.file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
  
          if (width < 100 || height < 100 || width > 300 || height > 300) {
            this.isImageValid = false;
            this.message = 'Image dimension must be between 100x100px and 300x300px!';
          }
          else this.message = ""
        };
      };
      reader.readAsDataURL(this.file);
    } else {
      this.isImageValid = false;
      this.message = 'Image must be jpg or png!';
    }

  }

  update(){
    this.message = ""
    this.messageSuccess = ""
    if (this.firstname == "" && this.lastname == "" && this.adress == "" &&
     this.telephone == "" && this.licenceNum =="" && this.department == "" && this.file == null){
      this.message = "You must enter data!"
      return
    }
    this.userServis.updateUser(this.user.username, this.firstname, this.lastname, this.adress, this.telephone, this.licenceNum, this.department).subscribe((res) =>{
      if (res['message'] == 'User updated!') this.messageSuccess = "Choosen fileds are updated";;
      if (this.file != null) this.userServis.updatePhoto(this.storageUsername, this.file).subscribe((res) =>{
        this.messageSuccess = "Choosen fileds are updated";
        if ((JSON.parse(localStorage.getItem("loggedUser"))).type != 2 ){
          this.userServis.getUser(this.storageUsername).subscribe((data : User) => {
            this.user = data
            localStorage.setItem("loggedUser", JSON.stringify(this.user))
          })
        }
      })
      else{
        if ((JSON.parse(localStorage.getItem("loggedUser"))).type != 2 ){
          this.userServis.getUser(this.storageUsername).subscribe((data : User) => {
            this.user = data
            localStorage.setItem("loggedUser", JSON.stringify(this.user))
          })
        }
      }
    })

  }
}
