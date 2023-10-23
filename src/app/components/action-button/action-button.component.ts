import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent {
  @Input() element: DomoticzItem

  constructor(private toolboxService: ToolboxService) {
  }

  defineLastTime = (): string => {
    return this.toolboxService.formatLastSeen(this.element.lastUpdate || "")
  }
}
