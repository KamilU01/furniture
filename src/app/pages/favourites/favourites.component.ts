import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { SeoService } from 'src/app/services/seo.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  products!: Array<Product>;
  isLoading: boolean = true;
  constructor(private shopService: ShopService, private seoService: SeoService) {
    this.seoService.changeSeoTags('Zapisane produkty', undefined, 'zapisane-produkty');
  }

  ngOnInit(): void {
    this.shopService.favouritesList.subscribe((res) => {
      this.products = res;
      this.isLoading = false;
    });
  }
}
