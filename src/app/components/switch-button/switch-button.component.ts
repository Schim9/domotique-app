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
    let valueToCheck = `${this.elementAsTmp.image}_${this.elementAsTmp.status}`
    switch (valueToCheck) {
      case "Light_On":
        return "./assets/switch/Light48_On.png"
      case "Light_Off":
        return "./assets/switch/Light48_Off.png"
      case "ChristmasTree_On":
        return "./assets/switch/ChristmasTree48_On.png"
      case "ChristmasTree_Off":
        return "./assets/switch/ChristmasTree48_Off.png"
      case "Fireplace_On":
        return "./assets/switch/Fireplace48_On.png"
      case "Fireplace_Off":
        return "./assets/switch/Fireplace48_Off.png"
      case "Fan_On":
        return "./assets/switch/Fan48_On.png"
      case "Fan_Off":
        return "./assets/switch/Fan48_Off.png"
      case "Push_On":
        return "./assets/switch/Push48_On.png"
      case "Push_Off":
        return "./assets/switch/Push48_Off.png"
      default:
        if (this.elementAsTmp.status == "On") {
          return "./assets/switch/Generic48_On.png"
        } else {
          return "./assets/switch/Generic48_Off.png"
        }
    }
  }
}
