import {Component, computed, inject, input, Input, output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";
import {Blind} from "../../models/blind.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class BlindButtonComponent {
  @Input({ isSignal: true, required: true }) readonly element = input.required<DomoticzItem>();
  readonly triggerAction = output<Action>();

  private toolBoxService = inject(ToolboxService);
  readonly elementAsTmp = computed(() => this.element() as Blind);

  handleClick = (value: string): void => {
    const el = this.element();
    let action = `type=command&param=switchlight&idx=${el.id}&switchcmd=${value}`
    this.triggerAction.emit(new Action(el.id, el.title, action))
  }

  handleRangeChange = (event: Event): void => {
    const el = this.element();
    let input = event.target as HTMLInputElement;
    let dimmerLevel = parseFloat(input.value);
    let action = `type=command&param=switchlight&idx=${el.id}&switchcmd=Set%20Level&level=${this.convertLevelValue(dimmerLevel)}`
    this.triggerAction.emit(new Action(el.id, el.title, action))
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }

  convertLevelValue = (domoticzBlindLevel: number = 0): number => {
    return 100 - domoticzBlindLevel
  }
}
