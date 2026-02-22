import {Component, computed, inject, input, Input} from '@angular/core';
import {TemperatureElement} from "../../models/temp.model";
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-temp-button',
  templateUrl: './temp-button.component.html',
  styleUrls: ['./temp-button.component.scss'],
  standalone: true,
  imports: []
})
export class TempButtonComponent {
  @Input({ isSignal: true, required: true } as any) readonly element = input.required<DomoticzItem>();

  private toolBoxService = inject(ToolboxService);
  readonly elementAsTmp = computed(() => this.element() as TemperatureElement);

  defineTemperatureIcon = (): string => {
    const path = './assets/temperature/';
    const elementTmp = this.elementAsTmp();
    if (+elementTmp.temperature < 5) return path + 'temp-0-5.png'
    else if (+elementTmp.temperature < 10) return path + 'temp-5-10.png'
    else if (+elementTmp.temperature < 15) return path + 'temp-10-15.png'
    else if (+elementTmp.temperature < 20) return path + 'temp-15-20.png'
    else if (+elementTmp.temperature < 25) return path + 'temp-20-25.png'
    else return path + 'temp-25-30.png'
  };

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }

  defineTemperature = (): string => {
    return (+this.elementAsTmp().temperature).toFixed(1);
  }
}
