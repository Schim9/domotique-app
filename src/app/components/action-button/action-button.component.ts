import {Component, inject, input, Input, output} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {Action} from "../../models/action.model";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  standalone: true,
  imports: []
})
export class ActionButtonComponent {
  @Input({ isSignal: true, required: true } as any) readonly element = input.required<DomoticzItem>();
  readonly triggerAction = output<Action>();

  private toolBoxService = inject(ToolboxService);

  handleClick = (): void => {
    const el = this.element();
    let action = `type=command&param=switchlight&idx=${el.id}&switchcmd=Toggle`
    this.triggerAction.emit(new Action(el.id, el.title, action))
  }

  defineLastTime = (): string => {
    return this.toolBoxService.formatLastSeen(this.element().lastUpdate || "")
  }
}
