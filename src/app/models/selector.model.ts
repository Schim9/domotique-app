import {DomoticzItem} from "./domoticz-item.model";

export class Selector extends DomoticzItem {
  override id: string
  override domoticzType?: string
  override title: string
  override caption: string
  override type: string = 'SELECTOR'
  override plan?: string
  override lastUpdate?: string
  level: number
  levelNames: string[]
  levelOffHidden: boolean
  data: string
  status: string

  constructor(
    id: string,
    title: string,
    caption: string,
    plan: string,
    lastUpdate: string,
    domoticzType: string,
    level: number,
    levelNames: string,
    levelOffHidden: boolean,
    favorite: number,
    data: string = '',
    status: string = ''
  ) {
    super(id, title, caption, plan, lastUpdate, domoticzType, favorite)
    this.level = level
    this.levelNames = levelNames.split('|')
    this.levelOffHidden = levelOffHidden
    this.data = data
    this.status = status
  }

  /** null = pas de durée parseable, >0 = minutes restantes */
  get remainingMinutes(): number | null {
    if (this.status !== 'On' || !this.lastUpdate || !this.data) return null
    const match = this.data.match(/(\d+)\s*min/)
    if (!match) return null
    const durationMs = parseInt(match[1]) * 60 * 1000
    const startTime = new Date(this.lastUpdate.replace(' ', 'T')).getTime()
    const remaining = (startTime + durationMs) - Date.now()
    return Math.max(0, Math.ceil(remaining / 60000))
  }

  get options(): { label: string; level: number }[] {
    return this.levelNames
      .map((label, index) => ({ label, level: index * 10 }))
      .filter(opt => !(this.levelOffHidden && opt.level === 0))
  }
}
