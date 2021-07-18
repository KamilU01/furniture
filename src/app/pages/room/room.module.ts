import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { RoomRoutingModule } from './room-routing.module';



@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    RoomRoutingModule,
  ]
})
export class RoomModule { }
