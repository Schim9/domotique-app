import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { SwitchButtonComponent } from './switch-button.component';
import { Switch } from '../../models/switch.model';
import { Action } from '../../models/action.model';

describe('SwitchButtonComponent', () => {
  let component: SwitchButtonComponent;
  let fixture: ComponentFixture<SwitchButtonComponent>;
  const element = new Switch('1', 'Test Switch', '', '3', '2024-01-01', 'On/Off', 'Off', 0, 'Generic', 0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SwitchButtonComponent],
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(SwitchButtonComponent);
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
  });
});
