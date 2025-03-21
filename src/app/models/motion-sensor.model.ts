import {DomoticzItem} from "./domoticz-item.model";

export class MotionSensor extends DomoticzItem {
  override id: string
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'MOTION_SENSOR'
  override   plan?: string
  override   lastUpdate?: string
  status?: string

  constructor(
    id: string,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    status: string,
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
    this.status = status;
  }
}
