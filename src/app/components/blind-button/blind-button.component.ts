import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-blind-button',
  templateUrl: './blind-button.component.html',
  styleUrls: ['./blind-button.component.scss']
})
export class BlindButtonComponent {
  @Input() element: DomoticzItem
}
