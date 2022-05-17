import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimeoutHelpers } from '../../utils/timeout.helpers';
import { CircleGaugeModel } from './circle-gauge.model';

@Component({
  selector: 'ced-circle-gauge',
  templateUrl: './circle-gauge.component.html',
  styleUrls: ['./circle-gauge.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CircleGaugeComponent {

  @ViewChild('gauge') gaugeComponent: ElementRef;

  config: CircleGaugeModel;

  animate = false;
  firstRun = true;

  constructor(private changeDetector: ChangeDetectorRef){}

  async updateAnimations(value: CircleGaugeModel) {
    if (!this.firstRun) {
      this.animate = false;
      await TimeoutHelpers.sleep(200);
      this.animate = true;
      this.config.currentValue = value.currentValue;
      return;
    }
    
    this.animate = true;
    this.config = value;
    this.firstRun = false;
  }
}
