import {EventEmitter, Injectable, Output} from '@angular/core';
import {DomoticzItem} from "../models/domoticz-item.model";
import {Blind} from "../models/blind.model";
import {TemperatureElement} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {PushButton} from "../models/push-button.model";
import {Contact} from "../models/contact.model";
import {Unknown} from "../models/unknown.model";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  blinds: DomoticzItem[] = []
  favorites: DomoticzItem[] = []
  tempSensors: DomoticzItem[] = []
  others: DomoticzItem[] = []
  @Output() fireRefresh: EventEmitter<any> = new EventEmitter();

  getBlinds = (): DomoticzItem[] => {
    return this.blinds;
  }

  getFavorites = (): DomoticzItem[] => {
    return this.favorites;
  }

  getTemperatures = (): DomoticzItem[] => {
    return this.tempSensors;
  }

  getRefreshTrigger = (): EventEmitter<any> => {
    return this.fireRefresh;
  }

  dispatchItems = (elements: DomoticzItem[]) => {
    elements.forEach(element => {
      switch (element.type) {
        case "BLIND":
          this.blinds.push(element);
          break;
        case "TEMP":
          this.tempSensors.push(element);
          break;
        default:
          this.others.push(element)
      }
      if (element.Favorite === 1) {
        this.favorites.push(element);
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
      json.Favorite
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
}
