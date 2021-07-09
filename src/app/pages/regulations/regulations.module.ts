import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegulationsComponent } from './regulations.component';
import { RegulationsRoutingModule } from './regulations-routing.module';



@NgModule({
  declarations: [
    RegulationsComponent
  ],
  imports: [
    CommonModule,
    RegulationsRoutingModule
  ]
})
export class RegulationsModule { }
