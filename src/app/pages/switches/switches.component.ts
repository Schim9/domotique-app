import {Component, inject, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class SwitchesComponent  implements OnInit {

  switchesRdC: DomoticzItem[] = []
  switchesEtage: DomoticzItem[] = []
  switchesUnknownPlan: DomoticzItem[] = []

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnInit(): void {
    this.initElement();
    this.toolBoxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.switchesRdC = []
    this.switchesEtage = []
    this.switchesUnknownPlan = []
    this.toolBoxService.getSwitches().forEach(element => {
      switch (element.plan) {
        case '3': this.switchesRdC.push(element); break;
        case '4': this.switchesEtage.push(element); break;
        default: this.switchesUnknownPlan.push(element);
      }
    })
  }

}
