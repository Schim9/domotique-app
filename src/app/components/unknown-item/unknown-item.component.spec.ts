import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { UnknownItemComponent } from './unknown-item.component';
import { DomoticzItem } from '../../models/domoticz-item.model';

describe('UnknownItemComponent', () => {
  let component: UnknownItemComponent;
  let fixture: ComponentFixture<UnknownItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnknownItemComponent],
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(UnknownItemComponent);
    component = fixture.componentInstance;
    component.element = new DomoticzItem('1', 'Test Item', '', '3', '2024-01-01', 'Unknown', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
