import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDoctorComponent } from './other-doctor.component';

describe('OtherDoctorComponent', () => {
  let component: OtherDoctorComponent;
  let fixture: ComponentFixture<OtherDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
