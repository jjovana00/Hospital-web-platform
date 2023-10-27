import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointementService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:4000';

  makeAppointment(examName, duration, patient, doctor, dateTime, department){
    const data = {
      examName : examName,
      duration : duration,
      patient : patient,
      doctor : doctor,
      dateTime : dateTime,
      department : department
    }
    return this.http.post(`${this.url}/appointment/makeAppointment`, data);
  }

  getPatientsAppointments(username){
    const data = {
      patient : username
    }
    return this.http.post(`${this.url}/appointment/getPatientsAppointments`, data);
  }

  deleteApp(id){
    return this.http.delete(`${this.url}/appointment/deleteApp/${id}`,);
  }

  getDoctorsPastAppointments(username){
    const data = {
      doctor : username
    }
    return this.http.post(`${this.url}/appointment/getDoctorsPastAppointments`, data);
  }

  getDoctorsFutureAppointments(username){
    const data = {
      doctor : username
    }
    return this.http.post(`${this.url}/appointment/getDoctorsFutureAppointments`, data);
  }

  setHasReview(id){
    const data = {
      id : id
    }
    return this.http.post(`${this.url}/appointment/setHasReview`, data);
  }
}
