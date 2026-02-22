import {Component, inject, OnInit} from '@angular/core';
import {DomoticzItem} from "../../models/domoticz-item.model";
import {ToolboxService} from "../../services/toolbox.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class BlindsComponent implements OnInit {

  blindsRdC: DomoticzItem[] = []
  blindsEtage: DomoticzItem[] = []
  blindsUnknownPlan: DomoticzItem[] = []

  private toolBoxService: ToolboxService = inject(ToolboxService)

  ngOnInit(): void {
    this.initElement();
    this.toolBoxService.getRefreshTrigger()
      .subscribe(() => this.initElement())
  }

  initElement = () : void => {
    this.blindsRdC = []
    this.blindsEtage = []
    this.blindsUnknownPlan = []
    this.toolBoxService.getBlinds().forEach(element => {
      switch (element.plan) {
        case '3': this.blindsRdC.push(element); break;
        case '4': this.blindsEtage.push(element); break;
        default: this.blindsUnknownPlan.push(element);
      }
    })
  }
}
