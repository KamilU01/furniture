import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangmentsComponent } from './arrangments.component';
import { ArrangmentsRoutingModule } from './arrangments-routing.module';



@NgModule({
  declarations: [
    ArrangmentsComponent
  ],
  imports: [
    CommonModule,
    ArrangmentsRoutingModule
  ]
})
export class ArrangmentsModule { }
