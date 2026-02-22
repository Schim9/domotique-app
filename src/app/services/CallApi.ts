import {inject, Injectable} from '@angular/core';
import {EMPTY, Observable, throwError} from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ToolboxService} from "./toolbox.service";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class CallApi {

  urlRegEx: RegExp = /https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/

  private newHttp: HttpClient = inject(HttpClient)
  private toolboxService: ToolboxService = inject(ToolboxService)
  private router: Router = inject(Router)

  call = (command: HTTP_COMMAND, param?: any): Observable<any> => {


    let serverAddress = this.toolboxService.getAppConfig().serverUrl
    let credential = this.toolboxService.getCredential()

    if (!this.urlRegEx.test(serverAddress)) {
      this.router.navigate(['/config'])
        .then(() => throwError(() => `${serverAddress} is not a valid url`))
    }

    const authenticatedHeader: HttpHeaders = new HttpHeaders()
      .append('Authorization', `Basic ${credential}`)
      .append('Content-Type', 'application/json')

    if (command === HTTP_COMMAND.GET) {
      return this.newHttp.get(serverAddress + '/json.htm?' + (param ? param : ''),
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.POST) {
      return this.newHttp.post(serverAddress + '/json.htm',
        param,
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.PUT) {
      return this.newHttp.put(serverAddress + '/json.htm',
        param,
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.DELETE) {
      return this.newHttp.delete(serverAddress + '/json.htm',
        {headers: authenticatedHeader});

    } else {
      return EMPTY;
    }

  }

}


export enum HTTP_ERROR {
  TECHNICAL = 500,
  UNAUTHORIZED = 401,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406
}

export enum HTTP_COMMAND {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 0
}
