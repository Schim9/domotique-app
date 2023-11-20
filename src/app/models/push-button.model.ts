import {DomoticzItem} from "./domoticz-item.model";

export class PushButton extends DomoticzItem {
  override id: number
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'PUSH_BUTTON'
  override   plan?: string
  override   lastUpdate?: string

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
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
  }
}
