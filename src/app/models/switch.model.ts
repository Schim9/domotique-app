import {DomoticzItem} from "./domoticz-item.model";

export class Switch extends DomoticzItem {
  override id: string
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'SWITCH'
  override plan?: string
  override lastUpdate?: string
  status?: string
  image?: string
  customeImage?: number

  constructor(
    id: string,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    status: string,
    favorite: number,
    image: string,
    customeImage: number
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
    this.image = image;
    this.customeImage = customeImage;
  }
}
