import {Component, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss']
})
export class SwitchesComponent  implements OnInit {

  switchesRdC: DomoticzItem[] = []
  switchesEtage: DomoticzItem[] = []
  switchesUnknownPlan: DomoticzItem[] = []

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit(): void {
    this.initElement();
    this.toolboxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.switchesRdC = []
    this.switchesEtage = []
    this.switchesUnknownPlan = []
    this.toolboxService.getSwitches().forEach(element => {
      switch (element.plan) {
        case '3': this.switchesRdC.push(element); break;
        case '4': this.switchesEtage.push(element); break;
        default: this.switchesUnknownPlan.push(element);
      }
    })
  }

}
