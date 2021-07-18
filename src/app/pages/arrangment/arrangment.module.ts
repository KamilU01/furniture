import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangmentComponent } from './arrangment.component';
import { ArrangmentRoutingModule } from './arrangment-routing.module';



@NgModule({
  declarations: [
    ArrangmentComponent
  ],
  imports: [
    CommonModule,
    ArrangmentRoutingModule
  ]
})
export class ArrangmentModule { }
