import { Component, OnInit } from '@angular/core';
import { cartItem } from 'src/app/models/graphql';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart!: Array<cartItem>;
  totalValue!: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartList.subscribe(res => {
      this.cart = res;
      console.log(this.cart)
    })

    this.cartService.totalValue.subscribe(res => {
      this.totalValue = res;
      console.log(this.totalValue)
    })
  }

}
