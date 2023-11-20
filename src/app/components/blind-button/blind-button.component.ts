import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.scss']
})
export class BlindButtonComponent {
  @Input() element: DomoticzItem
  @Output() triggerAction: EventEmitter<Action> = new EventEmitter<Action>()

  constructor(private toolboxService: ToolboxService) {
  }

  handleClick = (value: string): void => {
    let action = `type=command&param=switchlight&idx=${this.element.id}&switchcmd=${value}`
    this.triggerAction.emit(
      new Action(
        this.element.id,
        this.element.title,
        action
      )
    )
  }

  defineLastTime = (): string => {
    return this.toolboxService.formatLastSeen(this.element.lastUpdate || "")
  }
}
