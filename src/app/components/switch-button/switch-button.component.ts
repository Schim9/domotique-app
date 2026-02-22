import {Component, computed, inject, input, output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";
import {Switch} from "../../models/switch.model";

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
  standalone: true,
  imports: []
})
export class SwitchButtonComponent {
  readonly element = input.required<DomoticzItem>();
  readonly triggerAction = output<Action>();

  private toolBoxService = inject(ToolboxService);
  readonly elementAsTmp = computed(() => this.element() as Switch);

  handleClick = (): void => {
    const el = this.elementAsTmp();
    let action = `type=command&param=switchlight&idx=${el.id}&switchcmd=Toggle`
    this.triggerAction.emit(new Action(this.element().id, this.element().title, action))
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }

  defineIcon = (): string => {
    const el = this.elementAsTmp();
    switch (el.image) {
      case "Light":
      case "ChristmasTree":
      case "Fireplace":
      case "Fan":
      case "Push":
        return this.defineKnownIcon()
      default:
        return `./assets/switch/Generic48_${el.status}.png`
    }
  }

  private defineKnownIcon = (): string => {
    const el = this.elementAsTmp();
    return el.status === "Off"
      ? `./assets/switch/${el.image}48_Off.png`
      : `./assets/switch/${el.image}48_On.png`
  }
}
