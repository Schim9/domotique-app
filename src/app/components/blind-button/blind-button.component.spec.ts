import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SimpleChange } from '@angular/core';
import { BlindButtonComponent } from './blind-button.component';
import { Blind } from '../../models/blind.model';

describe('BlindButtonComponent', () => {
  let component: BlindButtonComponent;
  let fixture: ComponentFixture<BlindButtonComponent>;
  const element = new Blind('1', 'Test Blind', '', '3', '2024-01-01', 'Blinds', false, 0, 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlindButtonComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(BlindButtonComponent);
    component = fixture.componentInstance;
    component.element = element;
    component.ngOnChanges({ element: new SimpleChange(null, element, true) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
