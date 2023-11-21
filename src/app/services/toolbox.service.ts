import {EventEmitter, Injectable} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {PushButton} from "../models/push-button.model";
import {Contact} from "../models/contact.model";
import {Unknown} from "../models/unknown.model";
import * as moment from "moment/moment";
import {Config} from "../models/config.model";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  blinds: DomoticzItem[] = []
  favorites: DomoticzItem[] = []
  tempSensors: DomoticzItem[] = []
  switches: DomoticzItem[] = []
  others: DomoticzItem[] = []
  fireRefresh: EventEmitter<any> = new EventEmitter();
  triggerError: EventEmitter<{ type: string, message: string }> = new EventEmitter()

  // aide
  //Stockage d'un objet plus compliqué
  // localStorage.setItem('monObjet', JSON.stringify(monObjet));
  //Récupération de l'objet
  // monObjet = JSON.parse(localStorage.getItem('monObjet'));


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

  getRefreshTrigger = (): EventEmitter<any> => {
    return this.fireRefresh;
  }

  getErrorTrigger = (): EventEmitter<{ type: string, message: string }> => {
    return this.triggerError;
  }

  getAppConfig = (): Config  => {
    let currentConf = localStorage.getItem('appConfig');
    if (!!currentConf && currentConf.trim().length > 0 ) {
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

  setAppConfig = (appConfig: Config)  => {
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
}
  /**
   * Map devices
   */
  dispatchItems = (elements: DomoticzItem[]) => {
    this.blinds = [];
    this.tempSensors = [];
    this.switches = [];
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
         (this.switches.find(blind => blind.id === element.id) as Switch).status = (element as Switch)?.status;
         (this.switches.find(blind => blind.id === element.id) as Switch).lastUpdate = (element as Switch).lastUpdate;
          break;
        default:
         (this.others.find(blind => blind.id === element.id) as Switch).lastUpdate = (element as Switch).lastUpdate;
      }
    })
  }

  mapItem = (json : any): DomoticzItem[] => {
    // Force as Array in order to use map
    let jsonAsArray: any[] = json.result
    return jsonAsArray.map(jsonElement => {
      switch (jsonElement.SwitchType) {
        case "On/Off":
        case "Dimmer":
          return this.mapToSwitch(jsonElement)
        case "Push On Button":
          return  this.mapToPushButton(jsonElement)
        case "Motion Sensor":
          return  this.mapToMotionSensor(jsonElement)
        case "Blinds":
          return  this.mapToBlind(jsonElement)
        case "Contact":
          return  this.mapToContact(jsonElement)
        default:
          if (['Temp + Humidity', 'Temp'].includes(jsonElement.Type)) {
            return  this.mapToTemp(jsonElement)
          } else {
            console.log('Unlnown element', jsonElement)
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
    let lastUpdateAsMoment =  moment(lastUpdate);
    let currentDay = moment().startOf('day');
    let updateDay =  moment(lastUpdateAsMoment, 'MM/D/YYYY');
    let test = currentDay.diff(updateDay, 'days');
    if (currentDay.isSame(updateDay, 'day')) {
      return moment(lastUpdateAsMoment).format('HH:mm');
    } else if (test == 0) {
      return moment(lastUpdateAsMoment).format('[yest.] HH:mm');
    } else {
      return moment(lastUpdateAsMoment).format('DD MMM');
    }
  }
}
