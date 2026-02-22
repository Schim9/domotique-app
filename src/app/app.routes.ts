import { Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {BlindsComponent} from "./pages/blinds/blinds.component";
import {TemperaturesComponent} from "./pages/temperatures/temperatures.component";
import {SwitchesComponent} from "./pages/switches/switches.component";
import {ConfigComponent} from "./pages/config/config.component";
import {SensorsComponent} from "./pages/sensors/sensors.component";

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blinds',    component: BlindsComponent },
  { path: 'temp',      component: TemperaturesComponent },
  { path: 'switches',  component: SwitchesComponent },
  { path: 'config',    component: ConfigComponent },
  { path: 'sensors',   component: SensorsComponent },
  { path: '', redirectTo: '/temp', pathMatch: 'full' },
];
