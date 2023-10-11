import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider"
import {DomoticzItem} from "../../models/domoticz-item.model";

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements AfterViewInit, OnDestroy{

  @Input() elements: DomoticzItem[]

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance | null = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef?.nativeElement, {
      initial: 0,
      slides: {
        perView: 2,
        spacing: 19,
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
