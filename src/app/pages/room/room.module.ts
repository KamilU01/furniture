import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { RoomRoutingModule } from './room-routing.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';



@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule,
    ProductCardModule,
    RoomRoutingModule,
    PaginationModule
  ]
})
export class RoomModule { }
