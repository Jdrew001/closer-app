import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BarModel, GraphModel, KeyValue } from './bar-graph.model';
import { BarGraphService } from './bar-graph.service';
import { BarConstant } from './bar.constant';

@Component({
  selector: 'ced-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent {

  @Input() animation: boolean = true;
  @Input() data: GraphModel;
  @Input() selectedGraph: boolean = false;
  @Input() activeGraph: boolean = false;
  @Input() selectedDay: string = null;

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
}
