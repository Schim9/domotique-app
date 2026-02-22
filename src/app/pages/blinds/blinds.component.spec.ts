import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BlindsComponent } from './blinds.component';

describe('BlindsComponent', () => {
  let component: BlindsComponent;
  let fixture: ComponentFixture<BlindsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlindsComponent],
      providers: [DatePipe, provideHttpClient(), provideNoopAnimations(), provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(BlindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
