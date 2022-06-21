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

  _keys: Array<string> = [];
  get keys() { return this._keys; }
  @Input() set keys(value: Array<string>) {
    this._keys = value;
  }

  _data: GraphModel = new GraphModel();
  @Input() set data(value: GraphModel) {
    this._data = value;
  }
  get data() { return this._data; }

  @Input() selectedGraph: boolean = false;
  @Input() activeGraph: boolean = false;
  @Input() defaultGraph: boolean = false;

  _selectedDay: string;
  @Input() set selectedDay(val: string) {
    this._selectedDay = val;
  }
  get selectedDay() { return this._selectedDay; }

  @Output() daySelected$: EventEmitter<string> = new EventEmitter<string>();

  initAnimationCompleted = false;

  currentDay: string = BarConstant.DAY_DEFINITION_MAIN[new Date().getDay()];

  constructor(
    private animationController: AnimationController,
    public changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.changeDetection.detectChanges();
  }

  async ngAfterContentInit() {
    if (this.barChildren && !this.initAnimationCompleted) {
      let barAnimation = this.animateGraphInit();
      for (let i = 0; i < barAnimation.length; i++) {
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
    if (data == 0) {
      return {'display': 'none'}
    }
    if (data > 0 && data <= 25) {
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

  getColHeight(key: string) {
    let data = this.data.graphData.find(data => data.key == key)?.value;
    return data > 0 ? {'height': '0%'}: {'height': '90%'};
  }

  shouldShow(key: string) {
    let data = this.data.graphData.find(data => data.key == key)?.value;
    return data > 0;
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
      if (this.data?.graphData[index]) {
        let barValue = this.data.graphData[index].value;
        let animation = this.animationController.create()
          .addElement(item.nativeElement)
          .duration(800)
          .iterations(1)
          .delay(100)
          .keyframes([
            { offset: 0, height: `${0}%` },
            { offset: 0.3, height: `${barValue/4}%` },
            { offset: 0.7, height: `${barValue}%` },
            { offset: 1, height: `${barValue-8}%` }
          ]);
  
          animations.push(animation);
      }
    });

    return animations;
  }

  fadeInTooltip() {
    
  }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}
