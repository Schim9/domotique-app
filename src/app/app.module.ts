import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {CallApi} from "./services/CallApi";
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {BlindsComponent} from './pages/blinds/blinds.component';
import {TemperaturesComponent} from './pages/temperatures/temperatures.component';
import {ConfigComponent} from './pages/config/config.component';
import {HttpClientModule} from "@angular/common/http";
import {CarrouselComponent} from './components/carrousel/carrousel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BlindButtonComponent} from './components/blind-button/blind-button.component';
import {TempButtonComponent} from './components/temp-button/temp-button.component';
import {ActionButtonComponent} from './components/action-button/action-button.component';
import {UnknownItemComponent} from './components/unknown-item/unknown-item.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {SidenavComponent} from "./components/side-nav-bar/sidenav.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BlindsComponent,
    TemperaturesComponent,
    ConfigComponent,
    CarrouselComponent,
    BlindButtonComponent,
    TempButtonComponent,
    ActionButtonComponent,
    UnknownItemComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatLineModule,
    MatListModule,
  ],
  providers: [
    CallApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
