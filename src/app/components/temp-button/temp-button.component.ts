import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TemperatureElement} from "../../models/temp.model";
import {DomoticzItem} from "../../models/domoticz-item.model";
import * as moment from 'moment';

@Component({
  selector: 'app-temp-button',
  templateUrl: './temp-button.component.html',
  styleUrls: ['./temp-button.component.scss']
})
export class TempButtonComponent implements  OnChanges {
  @Input() element: DomoticzItem

  elementAsTmp : TemperatureElement

  ngOnChanges(changes: SimpleChanges): void {
    this.elementAsTmp = this.element as TemperatureElement
  }
  defineTemperatureIcon = (): string => {
    let path = './assets/temperature/';
    let elementTmp = this.elementAsTmp
    if (+elementTmp.temperature < 5)
      return path + 'temp-0-5.png'
    else if (+elementTmp.temperature < 10 && +elementTmp.temperature >= 5)
      return path + 'temp-5-10.png'
    else if (+elementTmp.temperature < 15 && +elementTmp.temperature >= 10)
      return path + 'temp-10-15.png'
    else if (+elementTmp.temperature < 20 && +elementTmp.temperature >= 15)
      return path + 'temp-15-20.png'
    else if (+elementTmp.temperature < 25 && +elementTmp.temperature >= 20)
      return path + 'temp-20-25.png'
    else
      return path + 'temp-25-30.png'
  };

  defineLastTime = (): string => {
    let lastUpdateAsMoment =  moment(this.element.lastUpdate);
    let currentDay = moment().startOf('day');
    console.log('currentDay:', currentDay);
    let updateDay =  moment(lastUpdateAsMoment, 'MM/D/YYYY');
    console.log('updateDay:', updateDay);
    let test = currentDay.diff(updateDay, 'days');
    console.log('test:', currentDay.isSame(updateDay));
    console.log('currentDay.isSame(updateDay):', test);
    console.log('test duration:', this.element.title, currentDay, updateDay, test);
    if (currentDay.isSame(updateDay, 'day')) {
      return moment(lastUpdateAsMoment).format('HH:mm');
    } else if (test == 0) {
      return moment(lastUpdateAsMoment).format('[yest.] HH:mm');
    } else {
      return moment(lastUpdateAsMoment).format('DD MMM');
    }
  }

  defineTemperature = (): string => {
    let value: number = +this.elementAsTmp.temperature
    return value.toFixed(2);
  }
}
