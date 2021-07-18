import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'src/app/services/alert/alert.module';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }
