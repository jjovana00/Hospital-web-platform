import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDoctorsProfileComponent } from './show-doctors-profile.component';

describe('ShowDoctorsProfileComponent', () => {
  let component: ShowDoctorsProfileComponent;
  let fixture: ComponentFixture<ShowDoctorsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDoctorsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDoctorsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
