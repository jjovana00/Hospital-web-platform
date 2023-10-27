import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselHomepageComponent } from './carousel-homepage.component';

describe('CarouselHomepageComponent', () => {
  let component: CarouselHomepageComponent;
  let fixture: ComponentFixture<CarouselHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
