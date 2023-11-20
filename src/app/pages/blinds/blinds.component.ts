import {Component, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: 'app-blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss']
})
export class BlindsComponent implements OnInit {

  blindsRdC: DomoticzItem[] = []
  blindsEtage: DomoticzItem[] = []
  blindsUnknownPlan: DomoticzItem[] = []

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit(): void {
    this.initElement();
    this.toolboxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.blindsRdC = []
    this.blindsEtage = []
    this.blindsUnknownPlan = []
    this.toolboxService.getBlinds().forEach(element => {
      switch (element.plan) {
        case '3': this.blindsRdC.push(element); break;
        case '4': this.blindsEtage.push(element); break;
        default: this.blindsUnknownPlan.push(element);
      }
    })
  }
}
