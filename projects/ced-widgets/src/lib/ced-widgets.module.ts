import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarGraphComponent } from './graphs/bar-graph/bar-graph.component';



@NgModule({
  declarations: [
    BarGraphComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BarGraphComponent
  ]
})
export class CedWidgetsModule { }
