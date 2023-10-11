export class DomoticzItem {
  id: number = 0
  domoticzType?: string
  title: string
  caption: string
  type: string
  plan?: string
  lastUpdate?: string
  Favorite?: number

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    Favorite: number
  ) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.plan = plan;
    this.lastUpdate = lastUpdate;
    this.domoticzType = domoticzType;
    this.Favorite = Favorite;
  }
}
