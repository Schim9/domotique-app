import {Component, inject, OnInit} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";
import {DomoticzItem} from "../../models/domoticz-item.model";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class DashboardComponent implements OnInit {

  favoritesRdC: DomoticzItem[] = []
  favoritesEtage: DomoticzItem[] = []
  favoritesUnknownPlan: DomoticzItem[] = []

  private deviceStore: DeviceStoreService = inject(DeviceStoreService)

  ngOnInit(): void {
    this.initElement();
    this.deviceStore.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.favoritesRdC = []
    this.favoritesEtage = []
    this.favoritesUnknownPlan = []
    this.deviceStore.getFavorites().forEach(element => {
      switch (element.plan) {
        case '3': this.favoritesRdC.push(element); break;
        case '4': this.favoritesEtage.push(element); break;
        default: this.favoritesUnknownPlan.push(element);
      }
    })
  }
}
