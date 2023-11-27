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
}
