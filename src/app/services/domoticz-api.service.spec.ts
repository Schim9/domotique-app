import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { DomoticzApiService } from './domoticz-api.service';

describe('DomoticzApiService', () => {
  let service: DomoticzApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, provideHttpClient(), provideZonelessChangeDetection()]
    });
    service = TestBed.inject(DomoticzApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
