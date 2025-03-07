import {Component, EventEmitter, inject, Input, Output, SimpleChanges} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";
import {Blind} from "../../models/blind.model";

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.scss']
})
export class BlindButtonComponent {
  @Input() element: DomoticzItem
  @Output() triggerAction: EventEmitter<Action> = new EventEmitter<Action>()

  private toolBoxService: ToolboxService = inject(ToolboxService)
  elementAsTmp: Blind

  ngOnChanges(changes: SimpleChanges): void {
    this.elementAsTmp = this.element as Blind
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

  handleRangeChange = (event: Event): void => {
    let input = event.target as HTMLInputElement;
    let dimmerLevel = parseFloat(input.value);
    let action = `type=command&param=switchlight&idx=${this.element.id}&switchcmd=Set%20Level&level=${this.convertLevelValue(dimmerLevel)}`
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

  convertLevelValue = (domoticzBlindLevel: number = 0) : number =>  {
    return 100 - domoticzBlindLevel
  }
}
