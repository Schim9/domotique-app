import {DomoticzItem} from "./domoticz-item.model";

export class Switch extends DomoticzItem {
  override id: number = 0
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'SWITCH'
  override   plan?: string
  override   lastUpdate?: string
  status?: string

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    status: string
  ) {
    super(
      id,
      title,
      caption,
      plan,
      lastUpdate,
      domoticzType
    )
    this.status = status;
  }
}
