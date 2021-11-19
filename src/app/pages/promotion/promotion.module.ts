import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { PromotionRoutingModule } from './promotion-routing.module';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';



@NgModule({
  declarations: [
    PromotionComponent
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    ProductCardModule
  ]
})
export class PromotionModule { }
