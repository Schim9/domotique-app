import {Component} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {

  element: DomoticzItem[]= [
    {
      id: 1,
      title: 'title1',
      caption: 'caption1',
      type: 'blind'

    },
    {
      id: 2,
      title: 'title2',
      caption: 'caption2',
      type: 'action'
    },
    {
      id: 3,
      title: 'title3',
      caption: 'caption3',
      type: 'temp'
    }

  ]
  protected readonly interval = 0;
}
