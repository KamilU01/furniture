import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { PipesModule } from 'src/app/services/pipes/pipes.module';



@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ProductCardModule,
    PipesModule
  ]
})
export class GroupModule { }
