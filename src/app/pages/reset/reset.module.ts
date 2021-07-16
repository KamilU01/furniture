import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';
import { ResetRoutingModule } from './reset-routing.module';



@NgModule({
  declarations: [
    ResetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResetRoutingModule
  ]
})
export class ResetModule { }
