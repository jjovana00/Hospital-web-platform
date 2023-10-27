import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAppointmentsComponent } from './patients-appointments.component';

describe('PatientsAppointmentsComponent', () => {
  let component: PatientsAppointmentsComponent;
  let fixture: ComponentFixture<PatientsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
