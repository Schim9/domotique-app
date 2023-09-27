import {Injectable} from '@angular/core';
import {CallApi, HTTP_COMMAND} from "./CallApi";
import {DomoticzItem} from "../models/domoticz-item.model";
import {map, Observable} from "rxjs";
import {Blind} from "../models/blind.model";
import {Temp} from "../models/temp.model";
import {MotionSensor} from "../models/motion-sensor.model";
import {Switch} from "../models/switch.model";
import {PushButton} from "../models/push-button.model";
import {Contact} from "../models/contact.model";
import {Unknown} from "../models/unknown.model";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  constructor(private callApi: CallApi) {}

  blinds: DomoticzItem[] = []
  tempSensors: DomoticzItem[] = []
  others: DomoticzItem[] = []

  fetchAllElements = (): Observable<any> => {
    let param = '?type=command&param=getdevices&used=true&type=devices'

    return this.callApi.call(
      HTTP_COMMAND.GET,
      param
    ).pipe(
      map(result => this.mapItem(result)),
      map(result => {
      // Testing purpose
      console.log('mapped result', result);
      return result
    }),
      map(result => this.dispatchItems(result))
    )
  }

  getBlinds = (): DomoticzItem[] => {
    return this.blinds;
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
      json.Status
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
      json.Status
    )
  }

  mapToPushButton = (json: any): DomoticzItem => {
    return new PushButton(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type
    )
  }

  mapToBlind = (json: any): DomoticzItem => {
    return new Blind(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type
    )
  }

  mapToContact = (json: any): DomoticzItem => {
    return new Contact(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type
    )
  }

  mapToTemp = (json: any): DomoticzItem => {
    return new Temp(
      json.idx,
      json.Name,
      json.Description,
      json.PlanID,
      json.LastUpdate,
      json.Type,
      json.Temp,
      json.Humidity,
      json.HumidityStatus
    )
  }

  mapToUnknown = (json: any): DomoticzItem => {
    return new Unknown(
      json.idx,
      json.Name,
      json.SwitchType,
      json.PlanID,
      json.LastUpdate,
      json.Type
    )
  }
}
