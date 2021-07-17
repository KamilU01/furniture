import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/graphql';
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

  constructor(private shopService: ShopService, private cartService: CartService) { }

  ngOnInit(): void {
    this.shopService.getAllCategories().subscribe(res => {
      this.categories = res.data.categories;
    })

    this.cartService.cartList.subscribe(res => {
      this.cartItems = res.length;
    })
  }

}
