import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselItemComponent } from './carrousel-item.component';

describe('CarrouselItemComponent', () => {
  let component: CarrouselItemComponent;
  let fixture: ComponentFixture<CarrouselItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrouselItemComponent]
    });
    fixture = TestBed.createComponent(CarrouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
