import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'blinds',    loadComponent: () => import('./pages/blinds/blinds.component').then(m => m.BlindsComponent) },
  { path: 'temp',      loadComponent: () => import('./pages/temperatures/temperatures.component').then(m => m.TemperaturesComponent) },
  { path: 'switches',  loadComponent: () => import('./pages/switches/switches.component').then(m => m.SwitchesComponent) },
  { path: 'config',    loadComponent: () => import('./pages/config/config.component').then(m => m.ConfigComponent) },
  { path: 'sensors',   loadComponent: () => import('./pages/sensors/sensors.component').then(m => m.SensorsComponent) },
  { path: '', redirectTo: '/temp', pathMatch: 'full' },
];
