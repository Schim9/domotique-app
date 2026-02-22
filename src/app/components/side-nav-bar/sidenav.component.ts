import {Component, Input, Output, EventEmitter, inject} from "@angular/core";
import {ToolboxService} from "../../services/toolbox.service";
import {DomoticzApiService} from "../../services/domoticz-api.service";

import {RouterModule} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: "side-nav",
    styleUrls: ["./sidenav.component.scss"],
    templateUrl: 'sidenav.component.html',
    imports: [RouterModule, MatListModule, MatIconModule]
})
export class SidenavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  private toolBoxService: ToolboxService = inject(ToolboxService)
  private domoticzService: DomoticzApiService = inject(DomoticzApiService)

  public routeLinks = this.toolBoxService.routeLinks

  handleClick() {
    if (this.isExpanded)
      this.toggleMenu.emit()
  }

  triggerRefresh() {
    this.domoticzService.fetchAllElements(true)
      .subscribe()
  }
}
