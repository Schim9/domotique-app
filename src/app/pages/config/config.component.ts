import {Component, inject, OnInit} from '@angular/core';
import {ToolboxService} from "../../services/toolbox.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Config} from "../../models/config.model";
import {DomoticzApiService} from "../../services/domoticz-api.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  form: FormGroup

  urlRegEx: RegExp = /https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/

  private toolboxService: ToolboxService = inject(ToolboxService)
  private domoticzApiService: DomoticzApiService = inject(DomoticzApiService)

  sideMenuElements: any

  ngOnInit(): void {
    this.initForm();
    this.sideMenuElements = this.toolboxService.routeLinks
  }


  initForm() {
    let appConfig: Config = this.toolboxService.getAppConfig();
    this.form = new FormGroup({
      userName: new FormControl(appConfig.username, {validators: [Validators.required]}),
      userPassword: new FormControl(appConfig.password, {validators: [Validators.required]}),
      serverUrl: new FormControl(appConfig.serverUrl, {validators: [Validators.required, Validators.pattern(this.urlRegEx)]}),
      homepage: new FormControl(appConfig.homepage),
    })
  }

  submit() {
    const rawValue = this.form.getRawValue()
    let config: Config = new Config(
      rawValue.serverUrl,
      rawValue.userName,
      rawValue.userPassword,
      rawValue.homepage
    );
    this.toolboxService.setAppConfig(config);
    this.domoticzApiService
      .fetchAllElements()
      .subscribe()
  }
}
