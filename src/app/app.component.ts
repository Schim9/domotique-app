import {Component, inject, OnInit} from '@angular/core';
import {DomoticzApiService} from "./services/domoticz-api.service";
import {ToolboxService} from "./services/toolbox.service";
import {Router, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SidenavComponent} from "./components/side-nav-bar/sidenav.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, RouterOutlet, MatSidenavModule, SidenavComponent]
})
export class AppComponent implements OnInit {

  private toolBoxService: ToolboxService = inject(ToolboxService)
  private domoticzApiService: DomoticzApiService = inject(DomoticzApiService)
  private router: Router = inject(Router)

  public isExpanded: boolean = false;

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
      .fetchAllElements(false)
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
