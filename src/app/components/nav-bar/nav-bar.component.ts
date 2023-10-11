import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  public routeLinks = [
    { link: "blinds", name: "About", icon: "dashboard" },
    { link: "temp", name: "Locations", icon: "account_balance" },
  ];
  constructor(public route: ActivatedRoute) {}

}
