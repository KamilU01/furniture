import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { PipesModule } from 'src/app/services/pipes/pipes.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';



@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ProductCardModule,
    PipesModule,
    PaginationModule
  ]
})
export class GroupModule { }
