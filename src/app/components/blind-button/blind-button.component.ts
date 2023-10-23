import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.scss']
})
export class BlindButtonComponent {
  @Input() element: DomoticzItem

  constructor(private toolboxService: ToolboxService) {
  }

  defineLastTime = (): string => {
    return this.toolboxService.formatLastSeen(this.element.lastUpdate || "")
  }
}
