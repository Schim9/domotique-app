import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-carrousel-item',
  templateUrl: './carrousel-item.component.html',
  styleUrls: ['./carrousel-item.component.scss']
})
export class CarrouselItemComponent {
  @Input() element: DomoticzItem
}
