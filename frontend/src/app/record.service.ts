import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http : HttpClient) { }

  url = 'http://localhost:4000';

  makeReview(id, doctor, specialization, patient, dateTime, reasonForVisit, diagnosis, prescribedTherapy, nextControl){
    const data = {
      appointmentId : id,
      patient : patient,
      doctor : doctor,
      specialization : specialization,
      dateTime : dateTime,
      reasonForVisit : reasonForVisit,
      diagnosis : diagnosis,
      prescribedTherapy : prescribedTherapy,
      nextControl : nextControl
    }
    return this.http.post(`${this.url}/records/makeReview`, data);
  }

  getAllRecordsForPatient(username){
    const data = {
      patient : username
    }
    return this.http.post(`${this.url}/records/getAllRecordsForPatient`, data);
  }

  getRecordById(id){
    const data = {
      appointmentId : id
    }
    return this.http.post(`${this.url}/records/getRecordById`, data);
  }
}
