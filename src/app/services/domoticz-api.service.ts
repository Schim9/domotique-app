import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {CallApi, HTTP_COMMAND} from "./CallApi";
import {DeviceStoreService} from "./device-store.service";
import {DeviceMappingService} from "./device-mapping.service";
import {Action} from "../models/action.model";

@Injectable({
  providedIn: 'root'
})
export class DomoticzApiService {

  private callApi: CallApi = inject(CallApi)
  private deviceStore: DeviceStoreService = inject(DeviceStoreService)
  private deviceMapping: DeviceMappingService = inject(DeviceMappingService)

  fetchAllElements = (isRefresh: boolean): Observable<any> => {
    let param = 'type=command&param=getdevices&used=true&type=devices'

    return this.callApi.call(HTTP_COMMAND.GET, param).pipe(
      map(result => this.deviceMapping.mapItem(result)),
      map(result => {
        if (isRefresh) {
          this.deviceStore.replaceItem(result)
        } else {
          this.deviceStore.dispatchItems(result)
        }
      }),
      catchError(error => {
        this.deviceStore.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }

  fetchOneElement = (elementId: string): Observable<any> => {
    let param: string = `type=command&param=getdevices&rid=${elementId}`

    return this.callApi.call(HTTP_COMMAND.GET, param).pipe(
      map(result => this.deviceMapping.mapItem(result)),
      map(result => this.deviceStore.replaceItem(result)),
      catchError(error => {
        this.deviceStore.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }

  sendCommand = (actionData: Action): Observable<any> => {
    return this.callApi.call(HTTP_COMMAND.GET, actionData.action).pipe(
      map(response => {
        if (response.status !== 'OK') {
          this.deviceStore.triggerError.emit({type: 'error', message: `${actionData.elementName} has not been updated`})
          return of(-1)
        } else {
          this.deviceStore.triggerError.emit({type: 'info', message: `${actionData.elementName} has been updated`})
          return of(0)
        }
      }),
      switchMap(() => this.fetchOneElement(actionData.elementId)),
      catchError(error => {
        this.deviceStore.triggerError.emit({type: 'error', message: `${error.message}`})
        return of(`Bad Promise: ${error}`)
      })
    )
  }

  fetchPlans = (): Observable<any> => {
    return this.callApi.call(HTTP_COMMAND.GET, 'type=plans&order=name&used=true').pipe(
      map(result => (result.result ?? []).map((p: any) => ({ id: String(p.idx), name: p.Name }))),
      tap(plans => this.deviceStore.setPlans(plans)),
      catchError(error => {
        this.deviceStore.triggerError.emit({ type: 'error', message: error.message })
        return of([])
      })
    )
  }
}
