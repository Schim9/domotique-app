import {Component, OnInit} from '@angular/core';
import {ToolboxService} from "./services/toolbox.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DomotiqueApp';

  constructor(private toolbox: ToolboxService) {
  }

  ngOnInit(): void {
    this.toolbox.fetchAllElements().subscribe()
  }


}
