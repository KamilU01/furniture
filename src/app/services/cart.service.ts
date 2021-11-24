import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItem } from '../models/graphql';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartList: BehaviorSubject<Array<cartItem>> = new BehaviorSubject<
    Array<cartItem>
  >([]);
  public totalValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(cartItem: cartItem) {
    let currentCart = this.cartList.getValue();
    let duplicateItem = currentCart.find(
      (c) => c.product.id === cartItem.product.id
    );

    if (duplicateItem) {
      duplicateItem.quantity += cartItem.quantity;
    } else {
      currentCart.push(cartItem);
    }

    currentCart.forEach((item) => {
      item.value = +(item.quantity * item.product.price).toFixed(2);

      if (this.isPromo(item.product.promoEndDate))
        item.promoValue = +(item.quantity * item.product.promoPrice).toFixed(2);
    });

    this.cartList.next(currentCart);

    if (currentCart.length) {
      let value = 0;

      currentCart.forEach((item) => {
        if (this.isPromo(item.product.promoEndDate) && item.promoValue) {
          value += item.promoValue;
        } else if (item.value) {
          value += item.value;
        }

        this.totalValue.next(+value.toFixed(2));
      });
    } else {
      this.totalValue.next(0);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  removeFromCart(index: number) {
    let current = this.cartList.getValue();
    current.splice(index, 1);
    this.cartList.next(current);

    this.reloadCart(this.cartList.getValue());
  }

  reloadCart(cartList: Array<cartItem>) {
    cartList.forEach((item) => {
      item.value = +(item.quantity * item.product.price).toFixed(2);

      if (this.isPromo(item.product.promoEndDate))
        item.promoValue = +(item.quantity * item.product.promoPrice).toFixed(2);
    });

    this.cartList.next(cartList);

    let value = 0;

    if (this.cartList.getValue().length) {
      this.cartList.getValue().forEach((item) => {
        if (this.isPromo(item.product.promoEndDate) && item.promoValue) {
          value += item.promoValue;
        } else if (item.value) {
          value += item.value;
        }
      });
      this.totalValue.next(+value.toFixed(2));
    } else {
      this.totalValue.next(value);
    }

    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  loadSavedCart() {
    let cart: any = localStorage.getItem('cart');
    if (cart) this.cartList.next(JSON.parse(cart));
    let value = 0;

    if (this.cartList.getValue().length) {
      this.cartList.getValue().forEach((item) => {
        if (this.isPromo(item.product.promoEndDate) && item.promoValue) {
          value += item.promoValue;
        } else if (item.value) {
          value += item.value;
        }
      });
      this.totalValue.next(+value.toFixed(2));
    } else {
      this.totalValue.next(value);
    }
  }

  deleteSavedCart() {
    localStorage.removeItem('cart');
  }

  resetCart() {
    this.cartList.next([]);
    this.totalValue.next(0);
  }

  isPromo(dateToCheck: Date) {
    let currDate: Date = new Date();
    let promoDate: Date = new Date(dateToCheck);

    return currDate <= promoDate;
  }
}
