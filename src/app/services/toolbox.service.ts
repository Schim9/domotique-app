import {inject, Injectable} from '@angular/core';
import {Config} from "../models/config.model";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  private datePipe: DatePipe = inject(DatePipe)

  public routeLinks = [
    {link: "dashboard", name: "Dashboard", icon: "dashboard"},
    {link: "blinds", name: "Blinds", icon: "roller_shades"},
    {link: "temp", name: "Temperature", icon: "dew_point"},
    {link: "switches", name: "Switches", icon: "emoji_objects"},
    {link: "sensors", name: "Sensors", icon: "sensors"},
    {link: "selectors", name: "Selectors", icon: "sprinkler"},
//    {link: "mesures", name: "Mesures", icon: "content_paste_search"},
//    {link: "scenes", name: "Scenes", icon: "batch_prediction"},
    {link: "config", name: "Configuration", icon: "settings"},
  ]

  getAppConfig = (): Config => {
    let currentConf = localStorage.getItem('appConfig')
    if (!!currentConf && currentConf.trim().length > 0) {
      return JSON.parse(currentConf)
    } else {
      return new Config()
    }
  }

  setAppConfig = (appConfig: Config): void => {
    localStorage.setItem('appConfig', JSON.stringify(appConfig))
  }

  getCredential = (): string => {
    let userName = this.getAppConfig().username
    let password = this.getAppConfig().password
    return btoa(`${userName}:${password}`)
  }

  formatLastSeen = (lastUpdate: string): string => {
    const lastUpdateDate = new Date(lastUpdate)
    const today = new Date()
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const lastMidnight = new Date(lastUpdateDate.getFullYear(), lastUpdateDate.getMonth(), lastUpdateDate.getDate())
    const diffDays = Math.round((todayMidnight.getTime() - lastMidnight.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) {
      return this.datePipe.transform(lastUpdate, "HH:mm") || ""
    } else if (diffDays === 1) {
      return "yest." + this.datePipe.transform(lastUpdate, "HH:mm") || ""
    } else {
      return this.datePipe.transform(lastUpdate, "dd MMM") || ""
    }
  }
}
