import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { ShopService } from 'src/app/services/shop.service';
import { Product } from 'src/app/models/graphql';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;

  product!: Product;

  subscription!: Subscription;
  urlSubscription!: Subscription;

  url = environment.apiUrl;
  amountText!: string;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private router: Router, protected alertService: AlertService, private cartService: CartService, private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(params => {
      this.subscription = this.shopService.findProductById(params['id']).subscribe(res => {
        this.product = res.data.product;
        this.shopService.addToLastViewedProducts(this.product);

        if (this.product.amount < 5) this.amountText = "na wyczerpaniu";
        if (this.product.amount >= 5) this.amountText = "dostępny";
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.urlSubscription.unsubscribe();
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ product: product, quantity: 1 });
    this.alertService.success('Produkt został dodany do koszyka!', this.options)
  }

  addToFavourites(product: Product) {
    this.alertService.success('Produkt został zapisany!', this.options)
    this.shopService.addToFavourites(product);
  }
}
