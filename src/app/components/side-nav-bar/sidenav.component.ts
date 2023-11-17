import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "side-nav",
  styleUrls: ["./sidenav.component.scss"],
  templateUrl: 'sidenav.component.html',
})
export class SidenavComponent {
  @Input() isExpanded: boolean;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: "dashboard", name: "Dashboard", icon: "dashboard" },
    { link: "blinds", name: "Blinds", icon: "roller_shades" },
    { link: "temp", name: "Temperature", icon: "dew_point" },
    { link: "switches", name: "Switches", icon: "switch" },
    { link: "config", name: "Configuration", icon: "settings" },
  ];
}
