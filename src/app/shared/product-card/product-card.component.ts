import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() isFavourite!: boolean;
  url = environment.apiUrl;

  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  isPromo!: boolean;

  promoPercentage!: string;

  constructor(
    private cartService: CartService,
    protected alertService: AlertService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    if (this.product.promoEndDate) {
      let currDate: Date = new Date();
      let promoDate: Date = new Date(this.product.promoEndDate);
      this.isPromo = currDate <= promoDate;

      this.promoPercentage =  (((this.product.price - this.product.promoPrice) * 100) / this.product.price).toFixed(0);
    }
  }

  addToFavourites(product: Product) {
    this.alertService.success('Produkt został zapisany!', this.options);
    this.shopService.addToFavourites(product);
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ product, quantity: 1 });
    this.alertService.success(
      'Produkt został dodany do koszyka!',
      this.options
    );
  }

  removeFromFavourites(product: Product) {
    this.alertService.success(
      'Produkt został usunięty z zapisanych!',
      this.options
    );
    this.shopService.removeFromFavourites(product);
  }
}
