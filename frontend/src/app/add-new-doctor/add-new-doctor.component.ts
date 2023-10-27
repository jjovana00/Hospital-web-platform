import { Component, OnInit } from '@angular/core';
import { SpecService } from '../spec.service';
import { Specialization } from '../Model/specialization';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-doctor',
  templateUrl: './add-new-doctor.component.html',
  styleUrls: ['./add-new-doctor.component.css']
})
export class AddNewDoctorComponent implements OnInit {

  constructor(private specServis : SpecService, private userServis : UserService, private router : Router) {}

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
    this.specServis.getAllSpecializations().subscribe((data : Specialization[]) =>{
      this.specs = data 
    })
  }
  
  specs : Specialization[];
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
  licenceNum : number;
  spec : string;
  department : string;
  message : string;
  messageSuccess : string;
  isImageValid :boolean;
  file : File;

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



  addDoctor(){
    
    this.type = 1;
    this.approved = 1;
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

    if (this.licenceNum == undefined || this.licenceNum.toString() == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.department == undefined || this.department.toString() == "")
    {
      this.message = "You must enter all data"
      return;
    }

    if (this.spec == undefined || this.spec == null)
    {
      this.message = "You must enter all data"
      return;
    }

    this.userServis.register(this.firstname, this.lastname, this.username, this.password, 
      this.passwordCon, this.adress, this.telephone, this.email, this.type, 
      this.approved, this.department, this.licenceNum, this.spec, this.file).subscribe((rep) => {
      if(rep['message'] == 'user added') this.messageSuccess = "Doctor has been added successfully!"
      else this.message = rep['message'];
    })


  }

  
}
