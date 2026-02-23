import {EventEmitter, Injectable, signal} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {Plan} from "../models/plan.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceStoreService {

  readonly plans = signal<Plan[]>([])
  readonly blinds = signal<DomoticzItem[]>([])
  readonly favorites = signal<DomoticzItem[]>([])
  readonly tempSensors = signal<DomoticzItem[]>([])
  readonly switches = signal<DomoticzItem[]>([])
  readonly sensors = signal<DomoticzItem[]>([])
  private readonly others = signal<DomoticzItem[]>([])

  triggerError: EventEmitter<{ type: string, message: string }> = new EventEmitter()

  setPlans = (plans: Plan[]): void => this.plans.set(plans)

  dispatchItems = (elements: DomoticzItem[]): void => {
    const blinds: DomoticzItem[] = []
    const tempSensors: DomoticzItem[] = []
    const switches: DomoticzItem[] = []
    const sensors: DomoticzItem[] = []
    const others: DomoticzItem[] = []
    const favorites: DomoticzItem[] = []

    elements.forEach(element => {
      switch (element.type) {
        case "BLIND":         blinds.push(element); break
        case "TEMP":          tempSensors.push(element); break
        case "SWITCH":        switches.push(element); break
        case "MOTION_SENSOR": sensors.push(element); break
        default:              others.push(element)
      }
      if (element.Favorite === 1) favorites.push(element)
    })

    this.blinds.set(blinds)
    this.tempSensors.set(tempSensors)
    this.switches.set(switches)
    this.sensors.set(sensors)
    this.others.set(others)
    this.favorites.set(favorites)
  }

  replaceItem = (elements: DomoticzItem[]): void => {
    elements.forEach(element => {
      switch (element.type) {
        case "SWITCH":
          this.switches.update(list => list.map(s =>
            s.id === element.id
              ? Object.assign(s, { status: (element as Switch).status, lastUpdate: element.lastUpdate })
              : s
          ))
          break
        case "BLIND":
          this.blinds.update(list => list.map(b =>
            b.id === element.id
              ? Object.assign(b, { lastUpdate: element.lastUpdate, level: (element as Blind).level })
              : b
          ))
          break
        case "MOTION_SENSOR":
          this.sensors.update(list => list.map(s =>
            s.id === element.id
              ? Object.assign(s, { status: (element as MotionSensor).status, lastUpdate: element.lastUpdate })
              : s
          ))
          break
        case "TEMP":
          this.tempSensors.update(list => list.map(s =>
            s.id === element.id
              ? Object.assign(s, {
                  temperature: (element as TemperatureElement).temperature,
                  humidity: (element as TemperatureElement).humidity,
                  lastUpdate: element.lastUpdate
                })
              : s
          ))
          break
        default:
          this.others.update(list => list.map(o =>
            o.id === element.id ? Object.assign(o, { lastUpdate: element.lastUpdate }) : o
          ))
      }
    })
  }
}
