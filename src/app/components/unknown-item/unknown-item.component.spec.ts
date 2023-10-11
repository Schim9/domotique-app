import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownItemComponent } from './unknown-item.component';

describe('UnknownItemComponent', () => {
  let component: UnknownItemComponent;
  let fixture: ComponentFixture<UnknownItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnknownItemComponent]
    });
    fixture = TestBed.createComponent(UnknownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
