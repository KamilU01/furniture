import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  url = environment.apiUrl;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private cartService: CartService, protected alertService: AlertService) { }

  ngOnInit(): void {
  }

  addToFavourites(product: Product) {
    this.alertService.success('Produkt został zapisany', this.options)
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ product, quantity: 1 });
    this.alertService.success('Produkt został dodany do koszyka!', this.options)
  }
}
