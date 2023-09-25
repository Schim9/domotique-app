import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CallApi {
  serverAddress: string = 'https://domotique.kaminski.lu';
  // serverAddress: string = 'http://192.168.0.97:8084';
  constructor(
    private newHttp: HttpClient
  ) {
  }

  call = (command: HTTP_COMMAND, param?: any): Observable<any> => {

    // Only for test purpose
    let credential = sessionStorage.getItem('credentials')
    const authenticatedHeader: HttpHeaders = new HttpHeaders()
      .append('Authorization', `${credential}`)
      .append('Content-Type', 'application/json')

    if (command === HTTP_COMMAND.GET) {
      return this.newHttp.get(this.serverAddress + '/json.htm' + (param ? param : ''),
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.POST) {
      return this.newHttp.post(this.serverAddress + '/json.htm',
        param,
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.PUT) {
      return this.newHttp.put(this.serverAddress + '/json.htm',
        param,
        {headers: authenticatedHeader});
    } else if (command === HTTP_COMMAND.DELETE) {
      return this.newHttp.delete(this.serverAddress + '/json.htm',
        {headers: authenticatedHeader});

    } else {
      return EMPTY;
    }

  }

}


export enum HTTP_ERROR {
  TECHNICAL = 500 ,
  UNAUTHORIZED = 401,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406
}

export enum HTTP_COMMAND {
  GET = 1 ,
  POST = 2,
  PUT = 3,
  DELETE = 0
}
