import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDoctorsAppointmentsComponent } from './past-doctors-appointments.component';

describe('PastDoctorsAppointmentsComponent', () => {
  let component: PastDoctorsAppointmentsComponent;
  let fixture: ComponentFixture<PastDoctorsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastDoctorsAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastDoctorsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
