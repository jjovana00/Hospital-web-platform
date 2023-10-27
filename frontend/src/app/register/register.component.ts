import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private servis : UserService) { }
  firstname : string;
  lastname : string;
  username : string;
  password : string;
  passwordCon : string;
  email : string;
  adress : string;
  telephone : string;
  type : number;
  approved : number;
  message : string;
  messageSuccess : string;

  ngOnInit(): void {
    this.message = "";
    this.messageSuccess = "";
  }

  isImageValid :boolean;
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

  register(){
    this.type = 0;
    this.approved = 0;
    this.messageSuccess=""
    this.message=""
    
    if (this.firstname == undefined || this.firstname == "")
    {
      this.message = "You must enter all data"
       return;
    }
    
    if (this.lastname == undefined || this.lastname == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.username == undefined || this.username == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.password == undefined || this.password == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.passwordCon == undefined || this.passwordCon == "")
    {
      this.message = "You must enter all data"
      return;
    }
    if (this.adress == undefined || this.adress == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.telephone == null || this.telephone == undefined)
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.email == undefined || this.email == "")
    {
      this.message = "You must enter all data"
      return;
    }

    this.servis.register(this.firstname, this.lastname, this.username, this.password, 
      this.passwordCon, this.adress, this.telephone, this.email, this.type, 
      this.approved, "", "0", "", this.file).subscribe((rep) => {
      if(rep['message'] == 'user added') this.messageSuccess = "Your request for registration is sent!"
      else this.message = rep['message'];
    })

    
  }

}
