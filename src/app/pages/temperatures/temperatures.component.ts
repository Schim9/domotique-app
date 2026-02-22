import {Component, inject, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class TemperaturesComponent  implements OnInit {

  tempRdC: DomoticzItem[] = []
  tempEtage: DomoticzItem[] = []
  tempUnknownPlan: DomoticzItem[] = []

  private toolboxService: ToolboxService = inject(ToolboxService)

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
