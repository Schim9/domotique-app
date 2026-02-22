import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DeviceStoreService } from './device-store.service';
import { Blind } from '../models/blind.model';
import { Switch } from '../models/switch.model';
import { TemperatureElement } from '../models/temp.model';
import { MotionSensor } from '../models/motion-sensor.model';

describe('DeviceStoreService', () => {
  let service: DeviceStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(DeviceStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('dispatchItems splits items into correct signals', () => {
    const items = [
      new Blind('1', 'B1', '', '3', '', 'Blinds', false, 0, 0),
      new Switch('2', 'S1', '', '3', '', 'On/Off', 'Off', 0, 'Generic', 0),
      new TemperatureElement('3', 'T1', '', '3', '', 'Temp', '20', '50', 'Normal', 0),
      new MotionSensor('4', 'M1', '', '3', '', 'Motion Sensor', 'Off', 0),
    ];
    service.dispatchItems(items);
    expect(service.blinds().length).toBe(1);
    expect(service.switches().length).toBe(1);
    expect(service.tempSensors().length).toBe(1);
    expect(service.sensors().length).toBe(1);
  });

  it('replaceItem updates switch status', () => {
    const sw = new Switch('10', 'SW', '', '3', '2024-01-01', 'On/Off', 'Off', 0, 'Generic', 0);
    service.dispatchItems([sw]);

    const updated = new Switch('10', 'SW', '', '3', '2024-01-02', 'On/Off', 'On', 0, 'Generic', 0);
    service.replaceItem([updated]);

    const found = service.switches().find(s => s.id === '10') as Switch;
    expect(found.status).toBe('On');
  });

  it('replaceItem updates blind level', () => {
    const blind = new Blind('20', 'BL', '', '3', '2024-01-01', 'Blinds', false, 0, 0);
    service.dispatchItems([blind]);

    const updated = new Blind('20', 'BL', '', '3', '2024-01-02', 'Blinds', false, 75, 0);
    service.replaceItem([updated]);

    const found = service.blinds().find(b => b.id === '20') as Blind;
    expect(found.level).toBe(75);
  });
});
