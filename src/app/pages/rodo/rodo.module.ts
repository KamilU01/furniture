import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodoComponent } from './rodo.component';
import { RodoRoutingModule } from './rodo-routing.module';



@NgModule({
  declarations: [
    RodoComponent
  ],
  imports: [
    CommonModule,
    RodoRoutingModule
  ]
})
export class RodoModule { }
