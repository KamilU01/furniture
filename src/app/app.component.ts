import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCookies: string | null = '';

  title = 'Maxii Home';

  constructor(private authService: AuthService, private cartService: CartService, private shopService: ShopService) { }

  ngOnInit() {
    this.isCookies = window.localStorage.getItem('cookies');
    this.authService.autoLogin();
    this.cartService.loadSavedCart();
    this.shopService.loadLastViewedProducts();
  }

  acceptCookies() {
    this.isCookies = 'accepted';
    window.localStorage.setItem('cookies', 'accepted');
  }
}
