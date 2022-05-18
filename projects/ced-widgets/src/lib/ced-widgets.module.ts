import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { BarGraphService } from './graphs/bar-graph/bar-graph.service';
import { CircleGaugeComponent } from './graphs/circle-gauge/circle-gauge.component';



@NgModule({
  declarations: [
    BarGraphComponent,
    CircleGaugeComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    BarGraphService
  ],
  exports: [
    BarGraphComponent,
    CircleGaugeComponent
  ]
})
export class CedWidgetsModule { }
