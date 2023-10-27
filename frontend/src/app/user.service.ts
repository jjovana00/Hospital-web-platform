import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Examination } from './Model/examination';
import {DomSanitizer} from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  sanitizer: any;

  constructor(private http : HttpClient) {}
  url = 'http://localhost:4000';

  isLogged : boolean = localStorage.getItem("loggedUserFlag") == 'true' ? true : false
  obj = this.isLogged? JSON.parse(localStorage.getItem("loggedUser")) : {'type' : -1, 'username' : ""}
  type : number = this.obj.type
  username : string = this.obj.username

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogged);
  private LoggedInTypeSubject = new BehaviorSubject<number>(this.type);
  private LoggedInUsernameSubject = new BehaviorSubject<string>(this.username);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  loggedInType$: Observable<number> = this.LoggedInTypeSubject.asObservable();
  loggedInUsername$: Observable<string> = this.LoggedInUsernameSubject.asObservable();

  login(username, password){
    const data = {
      username : username,
      password : password
    }
    return this.http.post(`${this.url}/users/login`, data);
  }

  loginAdmin(username, password){
    const data = {
      username : username,
      password : password
    }
    return this.http.post(`${this.url}/users/loginAdmin`, data);
  }

  loginSuccessfull(type, username){
    this.isLoggedInSubject.next(true);
    this.LoggedInTypeSubject.next(type);
    this.LoggedInUsernameSubject.next(username);
  }

  logout(){
    this.isLoggedInSubject.next(false);
    this.LoggedInTypeSubject.next(-1);
    this.LoggedInUsernameSubject.next("");
  }

  register(firstname, lastname, username, password, passwordCon, adress, telephone, email, type, approved, department, licenceNum, specialization, file){
    
    const formData:FormData = new FormData();
    if(file) formData.append('file', file, file.name);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('passwordCon', passwordCon);
    formData.append('adress', adress);
    formData.append('telephone', telephone);
    formData.append('email', email);
    formData.append('type', type);
    formData.append('approved', approved);
    formData.append('department', department);
    formData.append('licenceNum', licenceNum);
    formData.append('specialization', specialization);

    return this.http.post(`${this.url}/users/register`, formData);
  }

  getAllDoctors(){
    return this.http.get(`${this.url}/users/getAllDoctors`);
  }

  getAllPatients(){
    return this.http.get(`${this.url}/users/getAllPatients`);
  }

  getSignUpRequests(){
    return this.http.get(`${this.url}/users/getSignUpRequests`)
  }

  acceptPatient(username){
    const data ={
      username : username
    }
    return this.http.post(`${this.url}/users/acceptPatient`, data);
  }

  rejectPatient(username){
    const data ={
      username : username
    }
    return this.http.post(`${this.url}/users/rejectPatient`, data);
  }

  deleteUser(id){
    return this.http.delete(`${this.url}/users/deleteUser/${id}`,);
  }

  getUser(username){
    return this.http.get(`${this.url}/users/getUser?param=${username}`,);
  }

  updatePhoto(username, file){
    const formData:FormData = new FormData();
    if(file) formData.append('file', file, file.name);
    formData.append('username', username);
    return this.http.post(`${this.url}/users/updatePhoto`, formData);
  }

  updateUser(username, firstname, lastname, adress, telephone, licenceNum, department){
    const data = {
      username : username,
      firstname : firstname,
      lastname : lastname,
      adress : adress,
      telephone : telephone,
      licenceNum : licenceNum,
      department : department
    }
    return this.http.post(`${this.url}/users/updateUser`, data);
  }

  changePassword(oldP, newP, username){
    const data = {
      username : username,
      oldP : oldP,
      newP : newP,
    }
    return this.http.post(`${this.url}/users/changePassword`, data);
  }

  getDoctorsExaminations(username){
    const data = {
      doctor : username
    }
    return this.http.post(`${this.url}/doctorsExam/getAllExaminations`, data)
  }

  addNewExamForDoctor(username, exam : Examination){
    const data = {
      doctor : username,
      name : exam.name,
      cost : exam.cost,
      duration : exam.duration,
      approved : exam.approved
    }
    return this.http.post(`${this.url}/doctorsExam/addNewExamForDoctor`, data)
  }

  removeExamForDoctor(username, name){
    const data = {
      doctor : username,
      name : name
    }
    return this.http.post(`${this.url}/doctorsExam/removeExamForDoctor`, data)
  }

  deleteExamForDoctors(examName){
    const data = {
      examName : examName
    }
    return this.http.post(`${this.url}/doctorsExam/deleteExamForDoctors`, data)
  }

}
