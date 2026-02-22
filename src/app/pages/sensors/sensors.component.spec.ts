import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SensorsComponent } from './sensors.component';

describe('SensorsComponent', () => {
  let component: SensorsComponent;
  let fixture: ComponentFixture<SensorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SensorsComponent],
      providers: [DatePipe, provideHttpClient(), provideNoopAnimations(), provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(SensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
