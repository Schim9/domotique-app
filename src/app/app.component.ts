import {Component, inject, OnInit} from '@angular/core';
import {DomoticzApiService} from "./services/domoticz-api.service";
import {ToolboxService} from "./services/toolbox.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private toolBoxService: ToolboxService = inject(ToolboxService)
  private domoticzApiService: DomoticzApiService = inject(DomoticzApiService)
  private router: Router = inject(Router)

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

    if (this.toolBoxService.getAppConfig()?.homepage) {
      this.router.navigate([`/${this.toolBoxService.getAppConfig()?.homepage}`])
    }
    this.domoticzApiService
      .fetchAllElements()
      .subscribe()
  }

  handleNotification = () => {
    setTimeout(
      () => {
        this.message = "";
        this.messageType = "";
      }, 3000);
  }

  defineToastClass() {
    if (this.messageType === 'info') {
      return 'alert alert-success';
    } else {
      return 'alert alert-danger';
    }
  }
}
