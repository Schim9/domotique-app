import {Component, computed, inject} from '@angular/core';
import {DeviceStoreService} from "../../services/device-store.service";
import {NgIf} from "@angular/common";
import {CarrouselComponent} from "../../components/carrousel/carrousel.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [NgIf, CarrouselComponent]
})
export class DashboardComponent {

  private deviceStore = inject(DeviceStoreService)

  readonly favoritesRdC = computed(() => this.deviceStore.favorites().filter(e => e.plan === '3'))
  readonly favoritesEtage = computed(() => this.deviceStore.favorites().filter(e => e.plan === '4'))
  readonly favoritesUnknownPlan = computed(() => this.deviceStore.favorites().filter(e => e.plan !== '3' && e.plan !== '4'))
}
