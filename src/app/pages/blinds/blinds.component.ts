import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-blinds',
  templateUrl: './blinds.component.html',
  styleUrls: ['./blinds.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class BlindsComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly blindsRdC = computed(() => this.deviceStore.blinds().filter(e => e.plan === '3'))
  readonly blindsEtage = computed(() => this.deviceStore.blinds().filter(e => e.plan === '4'))
  readonly blindsUnknownPlan = computed(() => this.deviceStore.blinds().filter(e => e.plan !== '3' && e.plan !== '4'))
}
