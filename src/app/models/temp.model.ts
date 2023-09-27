import {DomoticzItem} from "./domoticz-item.model";

export class Temp extends DomoticzItem {
  override id: number = 0
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'TEMP'
  override   plan?: string
  override   lastUpdate?: string
  temperature?: string
  humidity?: string
  HumidityStatus?: string

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    temperature: string,
    humidity: string,
    HumidityStatus: string
  ) {
    super(
      id,
      title,
      caption,
      plan,
      lastUpdate,
      domoticzType
    )
    this.temperature = temperature;
    this.humidity = humidity;
    this.HumidityStatus = HumidityStatus;
  }
}
