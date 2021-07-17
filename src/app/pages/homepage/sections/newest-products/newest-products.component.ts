import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-newest-products',
  templateUrl: './newest-products.component.html',
  styleUrls: ['./newest-products.component.scss']
})
export class NewestProductsComponent implements OnInit, OnDestroy {
  products!: Array<Product>
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getNewsetsProducts().subscribe(res => {
      this.products = res.data.products;
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
