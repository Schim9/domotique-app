import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";

import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
    selector: 'app-blinds',
    templateUrl: './blinds.component.html',
    styleUrls: ['./blinds.component.scss'],
    imports: [CarrouselComponent]
})
export class BlindsComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly byPlan = computed(() => {
    const plans = this.deviceStore.plans()
    const knownIds = new Set(plans.map(p => p.id))
    return {
      groups: plans
        .map(p => ({ plan: p, items: this.deviceStore.blinds().filter(e => e.plan === p.id) }))
        .filter(g => g.items.length > 0),
      unknown: this.deviceStore.blinds().filter(e => !knownIds.has(e.plan ?? ""))
    }
  })
}
