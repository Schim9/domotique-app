import {Component, Input} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-unknown-item',
  templateUrl: './unknown-item.component.html',
  styleUrls: ['./unknown-item.component.scss'],
  standalone: true,
  imports: []
})
export class UnknownItemComponent {
  @Input() element: DomoticzItem
}
