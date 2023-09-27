export class DomoticzItem {
  id: number = 0
  domoticzType?: string
  title: string
  caption: string
  type: string
  plan?: string
  lastUpdate?: string

  constructor(
    id: number,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
  ) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.plan = plan;
    this.lastUpdate = lastUpdate;
    this.domoticzType = domoticzType;
  }
}
