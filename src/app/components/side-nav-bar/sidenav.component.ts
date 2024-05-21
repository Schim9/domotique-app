import {Component, Input, Output, EventEmitter, inject} from "@angular/core";
import {ToolboxService} from "../../services/toolbox.service";
import {DomoticzApiService} from "../../services/domoticz-api.service";

@Component({
  selector: "side-nav",
  styleUrls: ["./sidenav.component.scss"],
  templateUrl: 'sidenav.component.html',
})
export class SidenavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  private toolBoxService: ToolboxService = inject(ToolboxService)
  private domoticzService: DomoticzApiService = inject(DomoticzApiService)

  public routeLinks = this.toolBoxService.routeLinks

  handleClick() {
    // In case the side nav bar is open
    // We close it before routing.
    // Otherwise, the keen slider's rendering will be awful
    this.domoticzService.fetchAllElements().subscribe()
    if (this.isExpanded)
      this.toggleMenu.emit()
  }
}
