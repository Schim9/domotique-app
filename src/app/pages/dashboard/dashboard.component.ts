import {Component, inject, OnInit} from '@angular/core';
import {ToolboxService} from "../../services/toolbox.service";
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

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnInit(): void {
    this.initElement();
    this.toolBoxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.favoritesRdC = []
    this.favoritesEtage = []
    this.favoritesUnknownPlan = []
    this.toolBoxService.getFavorites().forEach(element => {
      switch (element.plan) {
        case '3': this.favoritesRdC.push(element); break;
        case '4': this.favoritesEtage.push(element); break;
        default: this.favoritesUnknownPlan.push(element);
      }
    })
  }
}
