import {
  AfterViewInit,
  Component,
  ElementRef, HostListener, inject,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider"
import {DomoticzItem} from "../../models/domoticz-item.model";
import {Action} from "../../models/action.model";
import {DomoticzApiService} from "../../services/domoticz-api.service";


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements AfterViewInit, OnDestroy {

  @Input() elements: DomoticzItem[]

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  private domoticzApiService: DomoticzApiService = inject(DomoticzApiService)

  slider: KeenSliderInstance | null = null

  isMobileIfLargerThan = 600

  ngAfterViewInit() {
    let perViewValue = 2;
    if (window.innerWidth >= this.isMobileIfLargerThan) {
      perViewValue = 5
    }
    this.slider = new KeenSlider(this.sliderRef?.nativeElement, {
      initial: 0,
      slides: {
        perView: perViewValue,
        spacing: 19,
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  onCLick = (action: Action) => {
    this.domoticzApiService.sendCommand(action).subscribe()
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    let perViewValue = 2;
    if (window.innerWidth >= this.isMobileIfLargerThan) {
      perViewValue = 5
    }
    this.slider = new KeenSlider(this.sliderRef?.nativeElement, {
      initial: 0,
      slides: {
        perView: perViewValue,
        spacing: 19,
      },
    })
  }
}
