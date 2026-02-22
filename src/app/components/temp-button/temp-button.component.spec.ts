import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { TempButtonComponent } from './temp-button.component';
import { TemperatureElement } from '../../models/temp.model';

describe('TempButtonComponent', () => {
  let component: TempButtonComponent;
  let fixture: ComponentFixture<TempButtonComponent>;
  const element = new TemperatureElement('1', 'Test Temp', '', '3', '2024-01-01', 'Temp + Humidity', '20.5', '50', 'Normal', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TempButtonComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(TempButtonComponent);
    component = fixture.componentInstance;
    component.element = element;
    component.ngOnChanges({ element: new SimpleChange(null, element, true) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
