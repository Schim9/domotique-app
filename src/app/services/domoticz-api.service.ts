import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {CallApi, HTTP_COMMAND} from "./CallApi";
import {ToolboxService} from "./toolbox.service";

@Injectable({
  providedIn: 'root'
})
export class DomoticzApiService {

  constructor(
    private callApi: CallApi,
    private toolBox: ToolboxService
  ) {
  }

  fetchAllElements = (): Observable<any> => {
    let param = '?type=command&param=getdevices&used=true&type=devices'

    return this.callApi.call(
      HTTP_COMMAND.GET,
      param
    ).pipe(
      map(result => this.toolBox.mapItem(result)),
      map(result => this.toolBox.dispatchItems(result)),
      map(() => console.log("EMIT!")),
      map(() => this.toolBox.getRefreshTrigger().emit(true)),
      catchError(error => {
        this.toolBox.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }
}
