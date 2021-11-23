import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWithParamsComponent } from './search-with-params.component';
import { SearchWithParamsRoutingModule } from './search-with-params-routing.module';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearchWithParamsComponent
  ],
  imports: [
    CommonModule,
    SearchWithParamsRoutingModule,
    ProductCardModule,
    FormsModule
  ]
})
export class SearchWithParamsModule { }
