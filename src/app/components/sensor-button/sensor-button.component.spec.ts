import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { SensorButtonComponent } from './sensor-button.component';
import { MotionSensor } from '../../models/motion-sensor.model';

describe('SensorButtonComponent', () => {
  let component: SensorButtonComponent;
  let fixture: ComponentFixture<SensorButtonComponent>;
  const element = new MotionSensor('1', 'Test Sensor', '', '3', '2024-01-01', 'Motion Sensor', 'Off', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SensorButtonComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(SensorButtonComponent);
    component = fixture.componentInstance;
    component.element = element;
    component.ngOnChanges({ element: new SimpleChange(null, element, true) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
