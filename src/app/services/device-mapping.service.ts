import {Injectable} from '@angular/core';
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
export class DeviceMappingService {

  mapItem = (json: any): DomoticzItem[] => {
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
            return this.mapToUnknown(jsonElement)
          }
      }
    }) as DomoticzItem[]
  }

  private mapToSwitch = (json: any): DomoticzItem => {
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

  private mapToMotionSensor = (json: any): DomoticzItem => {
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

  private mapToPushButton = (json: any): DomoticzItem => {
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

  private mapToBlind = (json: any): DomoticzItem => {
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

  private mapToContact = (json: any): DomoticzItem => {
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

  private mapToTemp = (json: any): DomoticzItem => {
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

  private mapToUnknown = (json: any): DomoticzItem => {
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
