import {Component, computed, inject, input, output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";
import {Selector} from "../../models/selector.model";

@Component({
  selector: 'app-selector-button',
  templateUrl: './selector-button.component.html',
  styleUrls: ['./selector-button.component.scss'],
  standalone: true,
  imports: []
})
export class SelectorButtonComponent {
  readonly element = input.required<DomoticzItem>();
  readonly triggerAction = output<Action>();

  private toolBoxService = inject(ToolboxService);
  readonly selector = computed(() => this.element() as Selector);

  handleChange = (level: number): void => {
    const el = this.selector();
    const action = `type=command&param=switchlight&idx=${el.id}&switchcmd=Set Level&level=${level}`
    this.triggerAction.emit(new Action(el.id, el.title, action))
  }

  readonly isIrrigationOn = computed(() => this.selector().status === 'On')

  readonly remainingTime = computed((): string | null => {
    const minutes = this.selector().remainingMinutes
    return minutes !== null && minutes > 0 ? `${minutes} min` : null
  })

  defineIcon = (): string => {
    return this.selector().status === 'On'
      ? './assets/selector/Irrigation48_On.png'
      : './assets/selector/Irrigation48_Off.png'
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }
}
