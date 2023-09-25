import {Injectable} from '@angular/core';
import {CallApi, HTTP_COMMAND} from "./CallApi";

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {

  constructor(private callApi: CallApi) {


    //Stockage d'un objet plus compliqué
    // localStorage.setItem('monObjet', JSON.stringify(monObjet));
    //Récupération de l'objet
    // monObjet = JSON.parse(localStorage.getItem('monObjet'));

  }

  fetchAllElements = (): void => {
    let param = 'type=command&param=getdevices&used=true&type=devices'
    this.callApi.call(
      HTTP_COMMAND.GET,
      param
    ).subscribe(result => console.log('fetchAllElements', result))
  }

  setCredential = (login: string, password: string): void => {
    localStorage.setItem(btoa(`${login}:${password}`), 'credentials');
  }

  getCredential = (): string | null => {
    return localStorage.getItem('credentials');
  }
}
