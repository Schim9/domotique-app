import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {
  @Input() element: DomoticzItem
  @Output() triggerAction: EventEmitter<Action> = new EventEmitter<Action>()

  private toolBoxService: ToolboxService = inject(ToolboxService)

  handleClick = (): void => {
    let action = `type=command&param=switchlight&idx=${this.element.id}&switchcmd=Toggle`
    this.triggerAction.emit(
      new Action(
        this.element.id,
        this.element.title,
        action
      )
    )
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element.lastUpdate || "")
  }
}
