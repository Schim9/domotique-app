import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActionButtonComponent } from './action-button.component';
import { DomoticzItem } from '../../models/domoticz-item.model';

describe('ActionButtonComponent', () => {
  let component: ActionButtonComponent;
  let fixture: ComponentFixture<ActionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionButtonComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
    component.element = new DomoticzItem('1', 'Test Action', '', '3', '2024-01-01', 'Push On Button', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
