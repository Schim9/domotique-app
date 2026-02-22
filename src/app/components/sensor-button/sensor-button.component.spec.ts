import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { SensorButtonComponent } from './sensor-button.component';
import { MotionSensor } from '../../models/motion-sensor.model';

describe('SensorButtonComponent', () => {
  let component: SensorButtonComponent;
  let fixture: ComponentFixture<SensorButtonComponent>;
  const element = new MotionSensor('1', 'Test Sensor', '', '3', '2024-01-01', 'Motion Sensor', 'Off', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SensorButtonComponent],
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(SensorButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', element);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit id on handleClick', () => {
    let emitted: string | undefined;
    component.triggerRefresh.subscribe((id: string) => emitted = id);
    component.handleClick();
    expect(emitted).toBe('1');
  });
});
