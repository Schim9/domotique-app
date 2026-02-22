import {Component, inject, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class SensorsComponent implements OnInit{


  sensorsRdC: DomoticzItem[] = []
  sensorsEtage: DomoticzItem[] = []
  sensorsUnknownPlan: DomoticzItem[] = []

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnInit(): void {
    this.initElement();
    this.toolBoxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.sensorsRdC = []
    this.sensorsEtage = []
    this.sensorsUnknownPlan = []
    this.toolBoxService.getSensors().forEach(element => {
      switch (element.plan) {
        case '3': this.sensorsRdC.push(element); break;
        case '4': this.sensorsEtage.push(element); break;
        default: this.sensorsUnknownPlan.push(element);
      }
    })
  }
}
