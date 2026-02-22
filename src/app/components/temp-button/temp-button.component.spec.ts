import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { TempButtonComponent } from './temp-button.component';
import { TemperatureElement } from '../../models/temp.model';

describe('TempButtonComponent', () => {
  let component: TempButtonComponent;
  let fixture: ComponentFixture<TempButtonComponent>;
  const element = new TemperatureElement('1', 'Test Temp', '', '3', '2024-01-01', 'Temp + Humidity', '20.5', '50', 'Normal', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TempButtonComponent],
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TempButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', element);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return temp-20-25.png icon for 20.5°', () => {
    expect(component.defineTemperatureIcon()).toContain('temp-20-25.png');
  });

  it('should format temperature to 1 decimal', () => {
    expect(component.defineTemperature()).toBe('20.5');
  });
});
