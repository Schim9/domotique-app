import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { SwitchButtonComponent } from './switch-button.component';
import { Switch } from '../../models/switch.model';

describe('SwitchButtonComponent', () => {
  let component: SwitchButtonComponent;
  let fixture: ComponentFixture<SwitchButtonComponent>;
  const element = new Switch('1', 'Test Switch', '', '3', '2024-01-01', 'On/Off', 'Off', 0, 'Generic', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SwitchButtonComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(SwitchButtonComponent);
    component = fixture.componentInstance;
    component.element = element;
    component.ngOnChanges({ element: new SimpleChange(null, element, true) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
