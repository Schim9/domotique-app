import {Component, inject, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {DeviceStoreService} from "../../services/device-store.service";
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

  private deviceStore: DeviceStoreService = inject(DeviceStoreService)

  ngOnInit(): void {
    this.initElement();
    this.deviceStore.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.tempRdC = []
    this.tempEtage = []
    this.tempUnknownPlan = []
    this.deviceStore.getTemperatures().forEach(element => {
      switch (element.plan) {
        case '3': this.tempRdC.push(element); break;
        case '4': this.tempEtage.push(element); break;
        default: this.tempUnknownPlan.push(element);
      }
    })
  }
}
