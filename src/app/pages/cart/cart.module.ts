import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule
  ]
})
export class CartModule { }
