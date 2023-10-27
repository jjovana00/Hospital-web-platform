import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CarouselHomepageComponent } from './carousel-homepage/carousel-homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { SignUpRequestsComponent } from './sign-up-requests/sign-up-requests.component';
import { AddNewDoctorComponent } from './add-new-doctor/add-new-doctor.component';
import { ListOfPatientsComponent } from './list-of-patients/list-of-patients.component';
import { ListOfDoctorsComponent } from './list-of-doctors/list-of-doctors.component';
import { UpdateUserMenagerComponent } from './update-user-menager/update-user-menager.component';
import { SpecializationsComponent } from './specializations/specializations.component';
import { AddNewExamComponent } from './add-new-exam/add-new-exam.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { OtherDoctorComponent } from './other-doctor/other-doctor.component';
import { ShowDoctorsProfileComponent } from './show-doctors-profile/show-doctors-profile.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { PatientsAppointmentsComponent } from './patients-appointments/patients-appointments.component';
import { DoctorsAppointmentsComponent } from './doctors-appointments/doctors-appointments.component';
import { PastDoctorsAppointmentsComponent } from './past-doctors-appointments/past-doctors-appointments.component';
import { MakeReviewComponent } from './make-review/make-review.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    CarouselHomepageComponent,
    RegisterComponent,
    DoctorsListComponent,
    SignUpRequestsComponent,
    AddNewDoctorComponent,
    ListOfPatientsComponent,
    ListOfDoctorsComponent,
    UpdateUserMenagerComponent,
    SpecializationsComponent,
    AddNewExamComponent,
    ChangePasswordComponent,
    ProfileComponent,
    OtherDoctorComponent,
    ShowDoctorsProfileComponent,
    MakeAppointmentComponent,
    PatientsAppointmentsComponent,
    DoctorsAppointmentsComponent,
    PastDoctorsAppointmentsComponent,
    MakeReviewComponent,
    PatientRecordsComponent,
    ViewReportComponent,
    LoginAdminComponent,
    UpdateExamComponent,
    PromotionsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
