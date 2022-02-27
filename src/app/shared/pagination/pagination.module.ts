import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductCardModule } from '../product-card/product-card.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    ProductCardModule,
    NgxPaginationModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
