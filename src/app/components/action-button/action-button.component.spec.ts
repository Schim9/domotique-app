import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { DomoticzItem } from '../../models/domoticz-item.model';
import { Action } from '../../models/action.model';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;
  const element = new DomoticzItem('1', 'Test Action', '', '3', '2024-01-01', 'Push On Button', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionButtonComponent],
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('element', element);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit Toggle action on handleClick', () => {
    let emitted: Action | undefined;
    component.triggerAction.subscribe((a: Action) => emitted = a);
    component.handleClick();
    expect(emitted).toBeDefined();
    expect(emitted!.action).toContain('switchcmd=Toggle');
    expect(emitted!.elementId).toBe('1');
  });
});
