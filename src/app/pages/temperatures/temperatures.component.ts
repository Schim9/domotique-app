import {Component, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss']
})
export class TemperaturesComponent  implements OnInit {

  tempRdC: DomoticzItem[] = []
  tempEtage: DomoticzItem[] = []
  tempUnknownPlan: DomoticzItem[] = []

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit(): void {
    this.initElement();
    this.toolboxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.tempRdC = []
    this.tempEtage = []
    this.tempUnknownPlan = []
    this.toolboxService.getTemperatures().forEach(element => {
      switch (element.plan) {
        case '3': this.tempRdC.push(element); break;
        case '4': this.tempEtage.push(element); break;
        default: this.tempUnknownPlan.push(element);
      }
    })
  }
}
