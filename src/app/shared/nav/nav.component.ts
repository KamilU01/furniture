import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/graphql';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isSidebarVisible: boolean = false;
  categories!: Array<Category>
  cartItems!: number;
  isDropdownActive: boolean = false;
  isLoggedIn!: boolean;
  constructor(private shopService: ShopService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.shopService.getAllCategories().subscribe(res => {
      this.categories = res.data.categories;
    })

    this.cartService.cartList.subscribe(res => {
      this.cartItems = res.length;
    })

    this.authService.isLogged.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  logout() {
    this.authService.logoutUser();
    this.isSidebarVisible = false;
  }
}
