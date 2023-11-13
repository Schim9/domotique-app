import {Component, OnInit} from '@angular/core';
import {DomoticzApiService} from "./services/domoticz-api.service";
import {ToolboxService} from "./services/toolbox.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private toolBoxService: ToolboxService,
    private domoticzApiService: DomoticzApiService
  ) {
  }

  public isExpanded = false;

  public messageType: string = ""
  public message: string = ""

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {

    this.toolBoxService.triggerError.subscribe(trigger => {
      this.messageType = trigger.type
      this.message = trigger.message
      this.handleNotification();
    })
    this.domoticzApiService
      .fetchAllElements()
      .subscribe()
  }

  handleNotification = ()  => {
    setTimeout(
      () => {
        this.message = "";
        this.messageType = "";
      }, 3000);
  }

}
