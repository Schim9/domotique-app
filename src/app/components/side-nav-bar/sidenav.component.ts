import {Component, Input, Output, EventEmitter, inject} from "@angular/core";
import {ToolboxService} from "../../services/toolbox.service";

@Component({
  selector: "side-nav",
  styleUrls: ["./sidenav.component.scss"],
  templateUrl: 'sidenav.component.html',
})
export class SidenavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  private toolBoxService: ToolboxService = inject(ToolboxService)

  public routeLinks = this.toolBoxService.routeLinks

  handleClick() {
    this.toolBoxService.getRefreshTrigger().emit()
    // In case the side nav bar is open
    // We close it before routing.
    // Otherwise, the keen slider's rendering will be awful
    // this.domoticzService.fetchAllElements().subscribe()
    if (this.isExpanded)
      this.toggleMenu.emit()
  }
}
