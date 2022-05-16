import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';
import { BarGraphService } from './graphs/bar-graph/bar-graph.service';



@NgModule({
  declarations: [
    BarGraphComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [
    BarGraphService
  ],
  exports: [
    BarGraphComponent
  ]
})
export class CedWidgetsModule { }
