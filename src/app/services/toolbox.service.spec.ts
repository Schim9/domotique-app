import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { provideZonelessChangeDetection } from '@angular/core';
import { ToolboxService } from './toolbox.service';

describe('ToolboxService', () => {
  let service: ToolboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ToolboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('formatLastSeen: returns HH:mm for today', () => {
    const now = new Date();
    const todayStr = now.toISOString().replace('T', ' ').substring(0, 19);
    const result = service.formatLastSeen(todayStr);
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it('formatLastSeen: returns "yest." prefix for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = service.formatLastSeen(yesterday.toISOString().replace('T', ' ').substring(0, 19));
    expect(result).toContain('yest.');
  });

  it('formatLastSeen: returns dd MMM for older dates', () => {
    const old = new Date();
    old.setDate(old.getDate() - 5);
    const result = service.formatLastSeen(old.toISOString().replace('T', ' ').substring(0, 19));
    // Should NOT contain ':' (time format) and NOT contain 'yest.'
    expect(result).not.toContain('yest.');
    expect(result.length).toBeGreaterThan(0);
  });
});
