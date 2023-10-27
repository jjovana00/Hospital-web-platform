import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewExamComponent } from './add-new-exam.component';

describe('AddNewExamComponent', () => {
  let component: AddNewExamComponent;
  let fixture: ComponentFixture<AddNewExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
