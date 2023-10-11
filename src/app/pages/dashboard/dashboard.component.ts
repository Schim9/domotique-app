import {Component, OnInit} from '@angular/core';
import {ToolboxService} from "../../services/toolbox.service";
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  favoritesRdC: DomoticzItem[] = []
  favoritesEtage: DomoticzItem[] = []
  favoritesUnknownPlan: DomoticzItem[] = []

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit(): void {
    console.log('Dashboard Init');
    this.initElement();
    this.toolboxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    console.log('Dashboard Element Init');
    this.toolboxService.getFavorites().forEach(element => {
      switch (element.plan) {
        case '3': this.favoritesRdC.push(element); break;
        case '4': this.favoritesEtage.push(element); break;
        default: this.favoritesUnknownPlan.push(element);
      }
    })
  }
}
