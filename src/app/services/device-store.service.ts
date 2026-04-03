import {EventEmitter, Injectable, signal} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {Selector} from "../models/selector.model";
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
  readonly selectors = signal<DomoticzItem[]>([])
  readonly sensors = signal<DomoticzItem[]>([])
  private readonly others = signal<DomoticzItem[]>([])

  triggerError: EventEmitter<{ type: string, message: string }> = new EventEmitter()

  setPlans = (plans: Plan[]): void => this.plans.set(plans)

  dispatchItems = (elements: DomoticzItem[]): void => {
    const blinds: DomoticzItem[] = []
    const tempSensors: DomoticzItem[] = []
    const switches: DomoticzItem[] = []
    const selectors: DomoticzItem[] = []
    const sensors: DomoticzItem[] = []
    const others: DomoticzItem[] = []
    const favorites: DomoticzItem[] = []

    elements.forEach(element => {
      switch (element.type) {
        case "BLIND":         blinds.push(element); break
        case "TEMP":          tempSensors.push(element); break
        case "SWITCH":        switches.push(element); break
        case "SELECTOR":      selectors.push(element); break
        case "MOTION_SENSOR": sensors.push(element); break
        default:              others.push(element)
      }
      if (element.Favorite === 1) favorites.push(element)
    })

    this.blinds.set(blinds)
    this.tempSensors.set(tempSensors)
    this.switches.set(switches)
    this.selectors.set(selectors)
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
              ? { ...s, status: (element as Switch).status, lastUpdate: element.lastUpdate }
              : s
          ))
          break
        case "SELECTOR": {
          const sel = element as Selector
          console.log(`[SELECTOR] searching id=${sel.id}(${typeof sel.id}) level=${sel.level} | stored:`, this.selectors().map(s => `${s.id}(${typeof s.id})`))
          this.selectors.update(list => list.map(s => {
            if (s.id === sel.id) {
              console.log(`[SELECTOR] MATCH → level ${(s as Selector).level} → ${sel.level}`)
              return Object.assign(Object.create(Object.getPrototypeOf(s)), s, { level: sel.level, levelNames: sel.levelNames, levelOffHidden: sel.levelOffHidden, lastUpdate: sel.lastUpdate, status: sel.status, data: sel.data })
            }
            return s
          }))
          break
        }
        case "BLIND":
          this.blinds.update(list => list.map(b =>
            b.id === element.id
              ? { ...b, lastUpdate: element.lastUpdate, level: (element as Blind).level }
              : b
          ))
          break
        case "MOTION_SENSOR":
          this.sensors.update(list => list.map(s =>
            s.id === element.id
              ? { ...s, status: (element as MotionSensor).status, lastUpdate: element.lastUpdate }
              : s
          ))
          break
        case "TEMP":
          this.tempSensors.update(list => list.map(s =>
            s.id === element.id
              ? { ...s, temperature: (element as TemperatureElement).temperature, humidity: (element as TemperatureElement).humidity, HumidityStatus: (element as TemperatureElement).HumidityStatus, lastUpdate: element.lastUpdate }
              : s
          ))
          break
        default:
          this.others.update(list => list.map(o =>
            o.id === element.id ? { ...o, lastUpdate: element.lastUpdate } : o
          ))
      }
      if (element.Favorite === 1) {
        this.favorites.update(list => list.map(f => {
          if (f.id !== element.id) return f
          switch (element.type) {
            case "SWITCH":        return { ...f, status: (element as Switch).status, lastUpdate: element.lastUpdate }
            // use Object.assign(Object.create)  because selectors have getters and setters
            case "SELECTOR":      return Object.assign(Object.create(Object.getPrototypeOf(f)), f, { level: (element as Selector).level, levelNames: (element as Selector).levelNames, levelOffHidden: (element as Selector).levelOffHidden, lastUpdate: element.lastUpdate, status: (element as Selector).status, data: (element as Selector).data })
            case "BLIND":         return { ...f, level: (element as Blind).level, lastUpdate: element.lastUpdate }
            case "MOTION_SENSOR": return { ...f, status: (element as MotionSensor).status, lastUpdate: element.lastUpdate }
            case "TEMP":          return { ...f, temperature: (element as TemperatureElement).temperature, humidity: (element as TemperatureElement).humidity, HumidityStatus: (element as TemperatureElement).HumidityStatus, lastUpdate: element.lastUpdate }
            default:              return { ...f, lastUpdate: element.lastUpdate }
          }
        }))
      }
    })
  }
}
