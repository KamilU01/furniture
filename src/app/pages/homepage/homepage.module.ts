import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { ArrangementsComponent } from './sections/arrangements/arrangements.component';
import { AdvantagesComponent } from './sections/advantages/advantages.component';
import { NewestProductsComponent } from './sections/newest-products/newest-products.component';
import { CategoriesComponent } from './sections/categories/categories.component';
import { LatestProductsComponent } from './sections/latest-products/latest-products.component';
import { ProductCardModule } from 'src/app/shared/product-card/product-card.module';
import { SafePipe } from 'src/app/services/pipes/safe.pipe';
import { PromotionsComponent } from './sections/promotions/promotions.component';
import { SwiperModule } from "swiper/angular";
import { SearchComponent } from './sections/search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomepageComponent,
    ArrangementsComponent,
    AdvantagesComponent,
    NewestProductsComponent,
    CategoriesComponent,
    LatestProductsComponent,
    SafePipe,
    PromotionsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ProductCardModule,
    SwiperModule,
    FormsModule
  ]
})
export class HomepageModule { }
