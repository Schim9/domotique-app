import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-temp-button',
  templateUrl: './temp-button.component.html',
  styleUrls: ['./temp-button.component.scss']
})
export class TempButtonComponent {
  src: string = './assets/temp.png'
  @Input() element: DomoticzItem
}
