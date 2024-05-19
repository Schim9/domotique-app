import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {MotionSensor} from "../../models/motion-sensor.model";

@Component({
  selector: 'app-sensor-button',
  templateUrl: './sensor-button.component.html',
  styleUrls: ['./sensor-button.component.scss']
})
export class SensorButtonComponent implements OnChanges {

  @Input() element: DomoticzItem
  @Output() triggerRefresh: EventEmitter<number> = new EventEmitter<number>()

  elementAsTmp: MotionSensor

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnChanges(changes: SimpleChanges): void {
    this.elementAsTmp = this.element as MotionSensor
  }

  defineIcon = (): string => {
    return `./assets/motion/motion48_${this.elementAsTmp.status}.png`
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element.lastUpdate || "")
  }

  handleClick = (): void => {
    this.triggerRefresh.emit(this.elementAsTmp.id)
  }
}
