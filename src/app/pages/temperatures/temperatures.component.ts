import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss'],
  standalone: true,
  imports: [CarrouselComponent]
})
export class TemperaturesComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly byPlan = computed(() => {
    const plans = this.deviceStore.plans()
    const knownIds = new Set(plans.map(p => p.id))
    return {
      groups: plans
        .map(p => ({ plan: p, items: this.deviceStore.tempSensors().filter(e => e.plan === p.id) }))
        .filter(g => g.items.length > 0),
      unknown: this.deviceStore.tempSensors().filter(e => !knownIds.has(e.plan ?? ""))
    }
  })
}
