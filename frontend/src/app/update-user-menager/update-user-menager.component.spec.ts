import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserMenagerComponent } from './update-user-menager.component';

describe('UpdateUserMenagerComponent', () => {
  let component: UpdateUserMenagerComponent;
  let fixture: ComponentFixture<UpdateUserMenagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserMenagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
