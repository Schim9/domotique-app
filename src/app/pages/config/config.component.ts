import { Component } from '@angular/core';
import {CallApi} from "../../services/CallApi";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {

  userLogin: string;
  userPassword: string;
  serverUrl: string;


  constructor(private callApi: CallApi){
    this.serverUrl = this.callApi.serverAddress;
  }
}
