import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecService {

  constructor(private http : HttpClient) { }
  url = 'http://localhost:4000';

  getAllSpecializations(){
    return this.http.get(`${this.url}/specialization/getAllSpecializations`)
  }

  deleteSpec(id){
    return this.http.delete(`${this.url}/specialization/deleteSpec/${id}`,);
  }

  addNewSpec(name){
    const data = {
      name : name,
      examination : []
    }
    return this.http.post(`${this.url}/specialization/addNewSpec`, data);
  }

  addNewExam(data){
    return this.http.post(`${this.url}/specialization/addNewExam`, data);
  }

  deleteExam(examName, specName){
    const data = {
      examName : examName,
      specName : specName
    }
    return this.http.post(`${this.url}/specialization/deleteExam`, data);
  }

  acceptExam(examName, specName) {
    const data = {
      examName : examName,
      specName : specName
    }
    return this.http.post(`${this.url}/specialization/acceptExam`, data);
  }

  getApprovedExams(name){
    const data = {
      name : name
    }
    return this.http.post(`${this.url}/specialization/getApprovedExams`, data);
  }

  addReqForExam(name, cost, duration, spec){
    const data = {
      spec : spec,
      name : name,
      cost : cost,
      duration : duration
    }
    return this.http.post(`${this.url}/specialization/addReqForExam`, data);

  }

  getExam(spec, exam){
    const data = {
      spec : spec,
      exam : exam
    }
    return this.http.post(`${this.url}/specialization/getExam`, data);
  }

  updateExam(spec, exam, cost, duration){
    const data = {
      spec : spec,
      exam : exam,
      cost : cost,
      duration : duration
    }
    return this.http.post(`${this.url}/specialization/updateExam`, data);
  }
}
