import { Component, Input, OnInit } from '@angular/core';
import { BarModel, GraphModel, KeyValue } from './bar-graph.model';
import { BarConstant } from './bar.constant';

@Component({
  selector: 'ced-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnInit {

  _configuration: BarModel;
  @Input() set configuration(config: BarModel) {
    console.log(config.keys)
    this._configuration = config;
  }
  get configuration() { return this._configuration; }

  get defaultSelectedData(): GraphModel { return this.configuration.data.find(item => item.selected) }
  selectedDay: string = BarConstant.DAY_DEFINITION[new Date().getDay()];

  constructor() { }

  ngOnInit() {
    
  }

  getLineValue(key: string) {
    return this.defaultSelectedData.graphData.find(data => data.key == key)?.value;
  }

  getWeeklyDate() {
    return `${this.defaultSelectedData.startDate} - ${this.defaultSelectedData.endDate}`;
  }

  getConfigurationTitle() {
    return this.configuration.title.split(" ");
  }

  getBarColor(key: string) {
    let data = this.defaultSelectedData.graphData.find(data => data.key == key)?.value;
    if (data >= 0 && data <= 25) {
      return {'background-color': 'rgba(36, 56, 142, 0.25)'}//
    }

    if (data >= 26 && data <= 50) {
      return {'background-color': 'rgba(36, 56, 142, 0.5)'}
    }

    if (data >= 51 && data <= 75) {
      return {'background-color': 'rgba(36, 56, 142, 0.75)'}
    }

    return {'background-color': 'rgba(36, 56, 142, 1)'};
  }

}
