import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BarModel, GraphModel, KeyValue } from './bar-graph.model';
import { Animation, AnimationController } from '@ionic/angular';
import { BarConstant } from './bar.constant';
import { TimeoutHelpers } from '../../utils/timeout.helpers';

@Component({
  selector: 'ced-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnInit {

  @ViewChildren('bar', {read: ElementRef}) barChildren: QueryList<ElementRef>;

  @Input() animation: boolean = true;
  _data: GraphModel;
  @Input() set data(value: GraphModel) {
    this._data = value;
    if (value && value.graphData) {
      console.log(this.barChildren);
    }
  }
  get data() { return this._data; }
  @Input() selectedGraph: boolean = false;
  @Input() activeGraph: boolean = false;

  _selectedDay: string;
  @Input() set selectedDay(val: string) {
    this._selectedDay = val;
    if (val) {

    }
  }
  get selectedDay() { return this._selectedDay; }
  @Output() daySelected$: EventEmitter<string> = new EventEmitter<string>();

  initAnimationCompleted = false;

  constructor(
    private animationController: AnimationController,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.changeDetection.detectChanges();
  }

  async ngAfterContentInit() {
    if (this.barChildren && !this.initAnimationCompleted) {
      let barAnimation = this.animateGraphInit();
      for (let i = 0; i < barAnimation.length; i++) {
        console.log('playing??');
        barAnimation[i].play();
        await TimeoutHelpers.sleep(50);

        if (i == barAnimation.length) {
          this.initAnimationCompleted = true;
        }
      }
    }
  }

  getLineValue(key: string) {
    return this.data.graphData.find(data => data.key == key)?.value;
  }

  getBarColor(key: string) {
    let data = this.data.graphData.find(data => data.key == key)?.value;
    if (data >= 0 && data <= 25) {
      return {'background-color': 'rgba(36, 56, 142, 0.25)'}
    }

    if (data >= 26 && data <= 50) {
      return {'background-color': 'rgba(36, 56, 142, 0.5)'}
    }

    if (data >= 51 && data <= 75) {
      return {'background-color': 'rgba(36, 56, 142, 0.75)'}
    }

    return {'background-color': 'rgba(36, 56, 142, 1)'};
  }

  getFormatterKey(value): string {
    return BarConstant.DAY_DEFINITION[value];
  }

  tapEvent(e, item) {
    this.daySelected$.emit(item);
  }

  animateGraphInit(): Array<Animation> {
    let animations: Array<Animation> = [];
    this.barChildren.forEach((item, index: number) => {
      let barValue = this.data.graphData[index].value;
      console.log(item.nativeElement);
      let animation = this.animationController.create()
        .addElement(item.nativeElement)
        .duration(800)
        .iterations(1)
        .delay(100)
        .keyframes([
          { offset: 0, height: `${0}%` },
          { offset: 0.3, height: `${barValue/4}%` },
          { offset: 0.7, height: `${barValue}%` },
          { offset: 1, height: `${barValue-8}%` }//
        ]);

        animations.push(animation);
    });

    return animations;
  }

  fadeInTooltip() {
    
  }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}
