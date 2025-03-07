import {DomoticzItem} from "./domoticz-item.model";

export class Blind extends DomoticzItem {
  override id: number
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'BLIND'
  override   plan?: string
  override   lastUpdate?: string
  hasDimmer: boolean = false
  level?: number

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    hasDimmer: boolean,
    level: number,
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
    );
    this.hasDimmer = hasDimmer;
    this.level = level;
  }
}
