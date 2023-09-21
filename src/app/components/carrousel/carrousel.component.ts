import { Component } from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {
  images: string[] = ['./assets/icons/icon-72x72.png', './assets/icons/icon-72x72.png', './assets/icons/icon-72x72.png'];

  element= [
    {
      id: 1,
      src: './assets/icons/icon-72x72.png',
      title: 'title1',
      caption: 'caption1'

    },
    {
      id: 2,
      src: './assets/icons/icon-72x72.png',
      title: 'title2',
      caption: 'caption2'
    },
    {
      id: 3,
      src: './assets/icons/icon-72x72.png',
      title: 'title3',
      caption: 'caption3'
    }

  ]
  protected readonly interval = 0;
}
