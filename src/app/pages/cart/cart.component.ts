import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/models/graphql';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Array<cartItem>;
  totalValue!: number;
  isLoading: boolean = true;

  isLoggedIn!: boolean;

  url = environment.apiUrl;

  isCheckout: boolean = false;

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.cartList.subscribe(res => {
      this.cart = res;
      this.isLoading = false;
    })

    this.cartService.totalValue.subscribe(res => {
      this.totalValue = res;
    })

    this.authService.isLogged.subscribe(res => this.isLoggedIn = res)
  }

  quantityChange() {
    this.cartService.reloadCart(this.cart);
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  onChangeQuantity(product: cartItem) {
    if (product.quantity < 0) product.quantity = 1
    this.cartService.reloadCart(this.cart);
  }

  confirm() {
    if (!this.isLoggedIn) {
      this.isCheckout = true;
    } else {
      this.router.navigate(["/podsumowanie-zamowienia"]);
    }
  }
}
