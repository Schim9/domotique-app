import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";
import {Switch} from "../../models/switch.model";

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss']
})
export class SwitchButtonComponent implements OnChanges {

  @Input() element: DomoticzItem
  @Output() triggerAction: EventEmitter<Action> = new EventEmitter<Action>()

  elementAsTmp : Switch

  constructor(private toolboxService: ToolboxService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementAsTmp = this.element as Switch
  }

  handleClick = (action: string): void => {
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

  defineIcon = (): string => {
    switch (this.elementAsTmp.image) {
      case "Light":
      case "ChristmasTree":
      case "Fireplace":
      case "Fan":
      case "Push":
        return this.defineKnownIcon()
      default:
        return `./assets/switch/Generic48_${this.elementAsTmp.status}.png`
    }
  }

  private defineKnownIcon = () : string => {
    if (this.elementAsTmp.status == "Off") {
      return `./assets/switch/${this.elementAsTmp.image}48_Off.png`
    } else {
      return `./assets/switch/${this.elementAsTmp.image}48_On.png`
    }
  }
}
