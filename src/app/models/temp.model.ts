import {DomoticzItem} from "./domoticz-item.model";

export class TemperatureElement extends DomoticzItem {
  override id: number
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'TEMP'
  override   plan?: string
  override   lastUpdate?: string
  temperature: string
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
    HumidityStatus: string,
    favorite: number
  ) {
    super(
      id,
      title,
      caption,
      plan,
      lastUpdate,
      domoticzType,
      favorite
    )
    this.temperature = temperature;
    this.humidity = humidity;
    this.HumidityStatus = HumidityStatus;
  }
}
