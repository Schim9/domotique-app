import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CarrouselComponent } from './carrousel.component';

describe('CarrouselComponent', () => {
  let component: CarrouselComponent;
  let fixture: ComponentFixture<CarrouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarrouselComponent],
      providers: [DatePipe, provideHttpClient(), provideNoopAnimations(), provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(CarrouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('elements', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
