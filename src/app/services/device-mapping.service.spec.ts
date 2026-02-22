import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DeviceMappingService } from './device-mapping.service';
import { Blind } from '../models/blind.model';
import { Switch } from '../models/switch.model';
import { TemperatureElement } from '../models/temp.model';
import { MotionSensor } from '../models/motion-sensor.model';
import { Unknown } from '../models/unknown.model';

const makeJson = (overrides: any) => ({
  result: [{
    idx: '42',
    Name: 'Test',
    Description: '',
    PlanID: '3',
    LastUpdate: '2024-01-01 12:00:00',
    Type: 'lighting1',
    Status: 'Off',
    Favorite: 0,
    Image: 'Generic',
    CustomImage: 0,
    SwitchType: '',
    HaveDimmer: false,
    Level: 0,
    Temp: '21.5',
    Humidity: '55',
    HumidityStatus: 'Normal',
    ...overrides
  }]
});

describe('DeviceMappingService', () => {
  let service: DeviceMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(DeviceMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('maps On/Off SwitchType to Switch', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'On/Off' }));
    expect(result[0]).toBeInstanceOf(Switch);
    expect(result[0].id).toBe('42');
  });

  it('maps Dimmer SwitchType to Switch', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'Dimmer' }));
    expect(result[0]).toBeInstanceOf(Switch);
  });

  it('maps Blinds SwitchType to Blind', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'Blinds' }));
    expect(result[0]).toBeInstanceOf(Blind);
  });

  it('maps Blinds + Stop SwitchType to Blind', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'Blinds + Stop' }));
    expect(result[0]).toBeInstanceOf(Blind);
  });

  it('maps Motion Sensor to MotionSensor', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'Motion Sensor' }));
    expect(result[0]).toBeInstanceOf(MotionSensor);
  });

  it('maps Temp + Humidity type to TemperatureElement', () => {
    const result = service.mapItem(makeJson({ SwitchType: '', Type: 'Temp + Humidity' }));
    expect(result[0]).toBeInstanceOf(TemperatureElement);
    expect((result[0] as TemperatureElement).temperature).toBe('21.5');
  });

  it('maps unknown SwitchType to Unknown', () => {
    const result = service.mapItem(makeJson({ SwitchType: 'Something Else', Type: 'other' }));
    expect(result[0]).toBeInstanceOf(Unknown);
  });
});
