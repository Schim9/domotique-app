import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {BlindsComponent} from "./pages/blinds/blinds.component";
import {TemperaturesComponent} from "./pages/temperatures/temperatures.component";
import {ConfigComponent} from "./pages/config/config.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blinds', component: BlindsComponent },
  { path: 'temp', component: TemperaturesComponent },
  { path: 'config', component: ConfigComponent },
  { path: '', redirectTo: '/temp', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
