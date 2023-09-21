import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlindsComponent } from './blinds.component';

describe('BlindsComponent', () => {
  let component: BlindsComponent;
  let fixture: ComponentFixture<BlindsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlindsComponent]
    });
    fixture = TestBed.createComponent(BlindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
