import { TestBed } from '@angular/core/testing';

import { DomoticzApiService } from './domoticz-api.service';

describe('DomoticzApiService', () => {
  let service: DomoticzApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomoticzApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
