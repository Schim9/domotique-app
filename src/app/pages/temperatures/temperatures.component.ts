import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
    selector: 'app-temperatures',
    templateUrl: './temperatures.component.html',
    styleUrls: ['./temperatures.component.scss'],
    imports: [CarrouselComponent]
})
export class TemperaturesComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly tempRdC = computed(() => this.deviceStore.tempSensors().filter(e => e.plan === '3'))
  readonly tempEtage = computed(() => this.deviceStore.tempSensors().filter(e => e.plan === '4'))
  readonly tempUnknownPlan = computed(() => this.deviceStore.tempSensors().filter(e => e.plan !== '3' && e.plan !== '4'))
}
