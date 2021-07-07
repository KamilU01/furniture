import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { ArrangementsComponent } from './sections/arrangements/arrangements.component';
import { AdvantagesComponent } from './sections/advantages/advantages.component';
import { NewestProductsComponent } from './sections/newest-products/newest-products.component';
import { CategoriesComponent } from './sections/categories/categories.component';
import { LatestProductsComponent } from './sections/latest-products/latest-products.component';



@NgModule({
  declarations: [
    HomepageComponent,
    ArrangementsComponent,
    AdvantagesComponent,
    NewestProductsComponent,
    CategoriesComponent,
    LatestProductsComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
