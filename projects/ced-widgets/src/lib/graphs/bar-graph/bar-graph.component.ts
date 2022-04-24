import { Component, Input, OnInit } from '@angular/core';
import { BarModel } from './bar-graph.model';

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

  constructor() { }

  ngOnInit() {
    
  }

  getLineValue(key: string) {
    return this.configuration.data.find(x => x.key == key).value;
  }

}
