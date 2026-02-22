import {Component, computed, inject, input, Input, output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {MotionSensor} from "../../models/motion-sensor.model";

@Component({
  selector: 'app-sensor-button',
  templateUrl: './sensor-button.component.html',
  styleUrls: ['./sensor-button.component.scss'],
  standalone: true,
  imports: []
})
export class SensorButtonComponent {
  @Input({ isSignal: true, required: true }) readonly element = input.required<DomoticzItem>();
  readonly triggerRefresh = output<string>();

  private toolBoxService = inject(ToolboxService);
  readonly elementAsTmp = computed(() => this.element() as MotionSensor);

  defineIcon = (): string => {
    return `./assets/motion/motion48_${this.elementAsTmp().status}.png`
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }

  handleClick = (): void => {
    this.triggerRefresh.emit(this.elementAsTmp().id)
  }
}
