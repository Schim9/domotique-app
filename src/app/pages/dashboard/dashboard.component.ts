import {Component, OnInit} from '@angular/core';
import {ToolboxService} from "../../services/toolbox.service";
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  blinds: DomoticzItem[]

  constructor(private toolboxService: ToolboxService) {}

  ngOnInit(): void {
    this.blinds = this.toolboxService.getBlinds();
  }
}
