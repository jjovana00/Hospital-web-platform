import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { CarouselHomepageComponent } from './carousel-homepage/carousel-homepage.component';
import { RegisterComponent } from './register/register.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { SignUpRequestsComponent } from './sign-up-requests/sign-up-requests.component';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { ListOfDoctorsComponent } from './list-of-doctors/list-of-doctors.component';
import { ListOfPatientsComponent } from './list-of-patients/list-of-patients.component';
import { UpdateUserMenagerComponent } from './update-user-menager/update-user-menager.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { AddNewExamComponent } from './add-new-exam/add-new-exam.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { OtherDoctorComponent } from './other-doctor/other-doctor.component';
import { ShowDoctorsProfileComponent } from './show-doctors-profile/show-doctors-profile.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { PatientsAppointmentsComponent } from './patients-appointments/patients-appointments.component';
import { PastDoctorsAppointmentsComponent } from './past-doctors-appointments/past-doctors-appointments.component';
import { DoctorsAppointmentsComponent } from './doctors-appointments/doctors-appointments.component';
import { MakeReviewComponent } from './make-review/make-review.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path : "", component:HomepageComponent},
  {path : "homepage", component:HomepageComponent},
  {path : "login", component:LoginComponent},
  {path : "carousel", component:CarouselHomepageComponent},
  {path : "register", component:RegisterComponent},
  {path : "getAllDoctors", component:DoctorsListComponent},
  {path : "signUpRequests", component:SignUpRequestsComponent},
  {path : "addNewDoctor", component:AddNewDoctorComponent},
  {path : "getListOfDoctors", component:ListOfDoctorsComponent},
  {path : "getListOfPatients", component:ListOfPatientsComponent},
  {path : "updateUserMenager", component:UpdateUserMenagerComponent},
  {path : "specializations", component:SpecializationsComponent},
  {path : "addNewExam", component:AddNewExamComponent},
  {path : "changePassword", component:ChangePasswordComponent},
  {path : "profile", component:ProfileComponent},
  {path : "other", component:OtherDoctorComponent},
  {path : "showDoctorsProfile", component:ShowDoctorsProfileComponent},
  {path: 'makeAppointment/:examName/:duration/:doctor/:department', component:MakeAppointmentComponent },
  {path : 'patientsAppointments', component:PatientsAppointmentsComponent},
  {path : 'pastAppointments', component:PastDoctorsAppointmentsComponent},
  {path : 'doctorsAppointments', component:DoctorsAppointmentsComponent},
  {path: 'makeReview/:id/:patient', component:MakeReviewComponent},
  {path : 'patientRecords/:patient', component:PatientRecordsComponent},
  {path : "viewReport/:id", component:ViewReportComponent},
  {path : "loginAdmin", component:LoginAdminComponent},
  {path : "updateExam/:examName/:specName", component:UpdateExamComponent},
  {path : "addNewPromotion", component:PromotionsComponent},
  {path : "myNotifications", component:NotificationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
