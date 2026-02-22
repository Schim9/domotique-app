import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
    selector: 'app-switches',
    templateUrl: './switches.component.html',
    styleUrls: ['./switches.component.scss'],
    imports: [CarrouselComponent]
})
export class SwitchesComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly switchesRdC = computed(() => this.deviceStore.switches().filter(e => e.plan === '3'))
  readonly switchesEtage = computed(() => this.deviceStore.switches().filter(e => e.plan === '4'))
  readonly switchesUnknownPlan = computed(() => this.deviceStore.switches().filter(e => e.plan !== '3' && e.plan !== '4'))
}
