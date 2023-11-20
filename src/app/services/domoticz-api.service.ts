import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {CallApi, HTTP_COMMAND} from "./CallApi";
import {ToolboxService} from "./toolbox.service";
import {Action} from "../models/action.model";

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
    let param = 'type=command&param=getdevices&used=true&type=devices'

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


  fetchOneElement = (elementId: number): Observable<any> => {
    let param: string = `type=command&param=getdevices&rid=${elementId}`

    return this.callApi.call(
      HTTP_COMMAND.GET,
      param
    ).pipe(
      map(result => this.toolBox.mapItem(result)),
      map(result => this.toolBox.replaceItem(result)),
      map(() => console.log("REFRESH!")),
      map(() => this.toolBox.getRefreshTrigger().emit(true)),
      catchError(error => {
        this.toolBox.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }

  sendCommand = (actionData: Action): Observable<any> => {
    return this.callApi.call(
      HTTP_COMMAND.GET,
      actionData.action
    ).pipe(
      map(response => {
        if (response.status !== 'OK') {
          this.toolBox.triggerError.emit({type: 'error', message: `${actionData.elementName} has not been updated`})
          return of(-1)
        } else {
          this.toolBox.triggerError.emit({type: 'info', message: `${actionData.elementName} has been updated`})
          return of(0)
        }
      }),
      tap(() => this.fetchOneElement(actionData.elementId).subscribe()),
      catchError(error => {
        this.toolBox.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }

  // TODO Lister les plans
  fetchPlan = (): Observable<any> => {
    // /json.htm?type=plans&order=name&used=true
    return of(true)
  }
}
