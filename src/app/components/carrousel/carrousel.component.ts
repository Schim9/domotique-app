import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {

  @Input() element: DomoticzItem[]

  protected readonly interval = 0;
}
