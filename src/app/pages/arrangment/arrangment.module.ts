import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangmentComponent } from './arrangment.component';
import { ArrangmentRoutingModule } from './arrangment-routing.module';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';



@NgModule({
  declarations: [
    ArrangmentComponent
  ],
  imports: [
    CommonModule,
    ArrangmentRoutingModule,
    ProductCardModule
  ]
})
export class ArrangmentModule { }
