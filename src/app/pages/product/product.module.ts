import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
