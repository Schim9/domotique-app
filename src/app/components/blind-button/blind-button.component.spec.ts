import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { BlindButtonComponent } from './blind-button.component';
import { Blind } from '../../models/blind.model';
import { Action } from '../../models/action.model';

describe('BlindButtonComponent', () => {
  let component: BlindButtonComponent;
  let fixture: ComponentFixture<BlindButtonComponent>;
  const element = new Blind('1', 'Test Blind', '', '3', '2024-01-01', 'Blinds', false, 0, 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlindButtonComponent],
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(BlindButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', element);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit triggerAction with Open command on handleClick', () => {
    let emitted: Action | undefined;
    component.triggerAction.subscribe((a: Action) => emitted = a);
    component.handleClick('Open');
    expect(emitted).toBeDefined();
    expect(emitted!.action).toContain('switchcmd=Open');
    expect(emitted!.elementId).toBe('1');
  });

  it('should emit triggerAction with Close command on handleClick', () => {
    let emitted: Action | undefined;
    component.triggerAction.subscribe((a: Action) => emitted = a);
    component.handleClick('Close');
    expect(emitted!.action).toContain('switchcmd=Close');
  });

  it('should compute elementAsTmp as Blind', () => {
    expect(component.elementAsTmp()).toBe(element);
  });
});
