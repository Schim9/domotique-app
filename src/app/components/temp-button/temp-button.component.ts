import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TemperatureElement} from "../../models/temp.model";
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-temp-button',
  templateUrl: './temp-button.component.html',
  styleUrls: ['./temp-button.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class TempButtonComponent implements  OnChanges {
  @Input() element: DomoticzItem

  elementAsTmp : TemperatureElement

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnChanges(changes: SimpleChanges): void {
    this.elementAsTmp = this.element as TemperatureElement
  }
  defineTemperatureIcon = (): string => {
    let path = './assets/temperature/';
    let elementTmp = this.elementAsTmp
    if (+elementTmp.temperature < 5)
      return path + 'temp-0-5.png'
    else if (+elementTmp.temperature < 10 && +elementTmp.temperature >= 5)
      return path + 'temp-5-10.png'
    else if (+elementTmp.temperature < 15 && +elementTmp.temperature >= 10)
      return path + 'temp-10-15.png'
    else if (+elementTmp.temperature < 20 && +elementTmp.temperature >= 15)
      return path + 'temp-15-20.png'
    else if (+elementTmp.temperature < 25 && +elementTmp.temperature >= 20)
      return path + 'temp-20-25.png'
    else
      return path + 'temp-25-30.png'
  };

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element.lastUpdate || "")
  }

  defineTemperature = (): string => {
    let value: number = +this.elementAsTmp.temperature
    return value.toFixed(1);
  }
}
