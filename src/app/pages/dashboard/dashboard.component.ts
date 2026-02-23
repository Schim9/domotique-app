import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CarrouselComponent]
})
export class DashboardComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly byPlan = computed(() => {
    const plans = this.deviceStore.plans()
    const knownIds = new Set(plans.map(p => p.id))
    return {
      groups: plans
        .map(p => ({ plan: p, items: this.deviceStore.favorites().filter(e => e.plan === p.id) }))
        .filter(g => g.items.length > 0),
      unknown: this.deviceStore.favorites().filter(e => !knownIds.has(e.plan ?? ''))
    }
  })
}
