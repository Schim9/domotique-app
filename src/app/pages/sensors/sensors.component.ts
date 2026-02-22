import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
    selector: 'app-sensors',
    templateUrl: './sensors.component.html',
    styleUrls: ['./sensors.component.scss'],
    imports: [CarrouselComponent]
})
export class SensorsComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly sensorsRdC = computed(() => this.deviceStore.sensors().filter(e => e.plan === '3'))
  readonly sensorsEtage = computed(() => this.deviceStore.sensors().filter(e => e.plan === '4'))
  readonly sensorsUnknownPlan = computed(() => this.deviceStore.sensors().filter(e => e.plan !== '3' && e.plan !== '4'))
}
