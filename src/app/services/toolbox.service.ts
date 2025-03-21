import {EventEmitter, inject, Injectable} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {PushButton} from "../models/push-button.model";
import {Contact} from "../models/contact.model";
import {Unknown} from "../models/unknown.model";
import {Config} from "../models/config.model";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  datePipe: DatePipe = inject(DatePipe)

  blinds: DomoticzItem[] = []
  favorites: DomoticzItem[] = []
  tempSensors: DomoticzItem[] = []
  switches: DomoticzItem[] = []
  sensors: DomoticzItem[] = []
  others: DomoticzItem[] = []
  fireRefresh: EventEmitter<any> = new EventEmitter();
  triggerError: EventEmitter<{ type: string, message: string }> = new EventEmitter()

  public routeLinks = [
    {link: "dashboard", name: "Dashboard", icon: "dashboard"},
    {link: "blinds", name: "Blinds", icon: "roller_shades"},  // blinds
    {link: "temp", name: "Temperature", icon: "dew_point"},
    {link: "switches", name: "Switches", icon: "emoji_objects"},
    {link: "sensors", name: "Sensors", icon: "sensors"},   // radar
//    {link: "mesures", name: "Mesures", icon: "content_paste_search"}, // design_services  // network_check // monitor_heart // manage_search
//    {link: "scenes", name: "Scenes", icon: "batch_prediction"}, // map  // local_movies // play_circle  // auto_mode
    {link: "config", name: "Configuration", icon: "settings"},
  ];

  getBlinds = (): DomoticzItem[] => {
    return this.blinds;
  }

  getFavorites = (): DomoticzItem[] => {
    return this.favorites;
  }

  getTemperatures = (): DomoticzItem[] => {
    return this.tempSensors;
  }

  getSwitches = (): DomoticzItem[] => {
    return this.switches;
  }

  getSensors = (): DomoticzItem[] => {
    return this.sensors;
  }

  getRefreshTrigger = (): EventEmitter<any> => {
    return this.fireRefresh;
  }

  getAppConfig = (): Config => {
    let currentConf = localStorage.getItem('appConfig');
    if (!!currentConf && currentConf.trim().length > 0) {
      return JSON.parse(currentConf);
    } else {
      return new Config();
    }
  }

  getCredential = (): string => {
    let userName = this.getAppConfig().username
    let password = this.getAppConfig().password
    return btoa(`${userName}:${password}`);
  }

  setAppConfig = (appConfig: Config) => {
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
  }
  /**
   * Map devices
   */
  dispatchItems = (elements: DomoticzItem[]) => {
    this.blinds = [];
    this.tempSensors = [];
    this.switches = [];
    this.sensors = [];
    this.others = [];
    this.favorites = [];
    elements.forEach(element => {
      switch (element.type) {
        case "BLIND":
          this.blinds.push(element);
          break;
        case "TEMP":
          this.tempSensors.push(element);
          break;
        case "SWITCH":
          this.switches.push(element);
          break;
        case "MOTION_SENSOR":
          this.sensors.push(element);
          break;
        default:
          this.others.push(element)
      }
      if (element.Favorite === 1) {
        this.favorites.push(element);
      }
    })
  }

  replaceItem = (elements: DomoticzItem[]) => {
    elements.forEach(element => {
      switch (element.type) {
        case "SWITCH":
          (this.switches.find(item => item.id === element.id) as Switch).status = (element as Switch)?.status;
          (this.switches.find(item => item.id === element.id) as Switch).lastUpdate = (element as Switch).lastUpdate;
          break;
        case "BLIND":
          (this.blinds.find(blind => blind.id === element.id) as Blind).lastUpdate = (element as Blind).lastUpdate;
          (this.blinds.find(blind => blind.id === element.id) as Blind).level = (element as Blind).level;
          break;
        case "MOTION_SENSOR":
          (this.sensors.find(sensor => sensor.id === element.id) as MotionSensor).status = (element as MotionSensor).status;
          (this.sensors.find(sensor => sensor.id === element.id) as MotionSensor).lastUpdate = (element as MotionSensor).lastUpdate;
          break;
        case "TEMP":
          (this.tempSensors.find(sensor => sensor.id === element.id) as TemperatureElement).temperature = (element as TemperatureElement).temperature;
          (this.tempSensors.find(sensor => sensor.id === element.id) as TemperatureElement).humidity = (element as TemperatureElement).humidity;
          (this.tempSensors.find(sensor => sensor.id === element.id) as TemperatureElement).lastUpdate = (element as TemperatureElement).lastUpdate;
          break;

        default:
          (this.others.find(otherItem => otherItem.id === element.id) as DomoticzItem).lastUpdate = (element as DomoticzItem).lastUpdate;
      }
    })
  }

  mapItem = (json: any): DomoticzItem[] => {
    // Force as Array in order to use map
    let jsonAsArray: any[] = json.result
    return jsonAsArray.map(jsonElement => {
      switch (jsonElement.SwitchType) {
        case "On/Off":
        case "Dimmer":
          return this.mapToSwitch(jsonElement)
        case "Push On Button":
          return this.mapToPushButton(jsonElement)
        case "Motion Sensor":
          return this.mapToMotionSensor(jsonElement)
        case "Blinds":
        case "Blinds + Stop":
          return this.mapToBlind(jsonElement)
        case "Contact":
          return this.mapToContact(jsonElement)
        default:
          if (['Temp + Humidity', 'Temp'].includes(jsonElement.Type)) {
            return this.mapToTemp(jsonElement)
          } else {
            // console.log('Unknown element', jsonElement)
            return this.mapToUnknown(jsonElement)
          }
      }
    }) as DomoticzItem[]
  }

  mapToSwitch = (json: any): DomoticzItem => {
    return new Switch(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Status,
      json.Favorite,
      json.Image,
      json.CustomImage
    )
  }

  mapToMotionSensor = (json: any): DomoticzItem => {
    return new MotionSensor(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Status,
      json.Favorite
    )
  }

  mapToPushButton = (json: any): DomoticzItem => {
    return new PushButton(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Favorite
    )
  }

  mapToBlind = (json: any): DomoticzItem => {
    return new Blind(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.HaveDimmer,
      json.Level,
      json.Favorite
    )
  }

  mapToContact = (json: any): DomoticzItem => {
    return new Contact(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Favorite
    )
  }

  mapToTemp = (json: any): DomoticzItem => {
    return new TemperatureElement(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Temp,
      json.Humidity,
      json.HumidityStatus,
      json.Favorite
    )
  }

  mapToUnknown = (json: any): DomoticzItem => {
    return new Unknown(
      json.idx,
      json.Name,
      json.SwitchType,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Favorite
    )
  }

  /**
   * Data format
   */
  formatLastSeen = (lastUpdate: string): string => {
    let lastUpdateDate: any = new Date(lastUpdate);
    let todayDate: any = new Date();
    let diffDays: any = Math.floor((todayDate - lastUpdateDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return this.datePipe.transform(lastUpdate, "HH:mm") || "";
    } else if (diffDays === 1) {
      return "yest." + this.datePipe.transform(lastUpdate, "HH:mm") || "";
    } else {
      return this.datePipe.transform(lastUpdate, "dd MMM") || "";
    }
  }
}
