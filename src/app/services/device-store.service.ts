import {EventEmitter, Injectable} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";

@Injectable({
  providedIn: 'root'
})
export class DeviceStoreService {

  private blinds: DomoticzItem[] = []
  private favorites: DomoticzItem[] = []
  private tempSensors: DomoticzItem[] = []
  private switches: DomoticzItem[] = []
  private sensors: DomoticzItem[] = []
  private others: DomoticzItem[] = []

  fireRefresh: EventEmitter<any> = new EventEmitter()
  triggerError: EventEmitter<{ type: string, message: string }> = new EventEmitter()

  getBlinds = (): DomoticzItem[] => this.blinds
  getFavorites = (): DomoticzItem[] => this.favorites
  getTemperatures = (): DomoticzItem[] => this.tempSensors
  getSwitches = (): DomoticzItem[] => this.switches
  getSensors = (): DomoticzItem[] => this.sensors

  getRefreshTrigger = (): EventEmitter<any> => this.fireRefresh

  dispatchItems = (elements: DomoticzItem[]): void => {
    this.blinds = []
    this.tempSensors = []
    this.switches = []
    this.sensors = []
    this.others = []
    this.favorites = []
    elements.forEach(element => {
      switch (element.type) {
        case "BLIND":        this.blinds.push(element); break;
        case "TEMP":         this.tempSensors.push(element); break;
        case "SWITCH":       this.switches.push(element); break;
        case "MOTION_SENSOR": this.sensors.push(element); break;
        default:             this.others.push(element);
      }
      if (element.Favorite === 1) {
        this.favorites.push(element)
      }
    })
  }

  replaceItem = (elements: DomoticzItem[]): void => {
    elements.forEach(element => {
      switch (element.type) {
        case "SWITCH": {
          const item = this.switches.find(s => s.id === element.id) as Switch
          if (item) {
            item.status = (element as Switch).status
            item.lastUpdate = element.lastUpdate
          }
          break
        }
        case "BLIND": {
          const item = this.blinds.find(b => b.id === element.id) as Blind
          if (item) {
            item.lastUpdate = element.lastUpdate
            item.level = (element as Blind).level
          }
          break
        }
        case "MOTION_SENSOR": {
          const item = this.sensors.find(s => s.id === element.id) as MotionSensor
          if (item) {
            item.status = (element as MotionSensor).status
            item.lastUpdate = element.lastUpdate
          }
          break
        }
        case "TEMP": {
          const item = this.tempSensors.find(s => s.id === element.id) as TemperatureElement
          if (item) {
            item.temperature = (element as TemperatureElement).temperature
            item.humidity = (element as TemperatureElement).humidity
            item.lastUpdate = element.lastUpdate
          }
          break
        }
        default: {
          const item = this.others.find(o => o.id === element.id)
          if (item) item.lastUpdate = element.lastUpdate
        }
      }
    })
  }
}
