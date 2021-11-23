import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWithParamsComponent } from './search-with-params.component';
import { SearchWithParamsRoutingModule } from './search-with-params-routing.module';



@NgModule({
  declarations: [
    SearchWithParamsComponent
  ],
  imports: [
    CommonModule,
    SearchWithParamsRoutingModule
  ]
})
export class SearchWithParamsModule { }
