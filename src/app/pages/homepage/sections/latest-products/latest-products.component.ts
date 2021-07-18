import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.scss']
})
export class LatestProductsComponent implements OnInit {
  latestProducts!: Array<Product>;
  isLoading: boolean = true;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getLastViewedProducts().subscribe(res => {
      this.latestProducts = res;
      this.isLoading = false;
    })
  }

}
