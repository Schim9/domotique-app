import {Component, OnInit} from '@angular/core';
import {DomoticzApiService} from "./services/domoticz-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private domoticzApiService: DomoticzApiService) {
  }

  public isExpanded = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.domoticzApiService
      .fetchAllElements()
      .subscribe()
  }


}
