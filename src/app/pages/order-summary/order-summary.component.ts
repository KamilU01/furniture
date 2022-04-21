import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { cartItem } from 'src/app/models/graphql';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  cart!: Array<cartItem>;
  totalValue!: number;
  isLoading: boolean = true;
  url = environment.apiUrl;
  errorMessage!: string;

  pickupInPerson: any = 0;

  isSuccess: boolean = false;
  isError: boolean = false;

  options = {
    autoClose: false,
    keepAfterRouteChange: true
  };

  constructor(private cartService: CartService, private router: Router, private shopService: ShopService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.cartService.cartList.subscribe(res => {
      if (res.length == 0) this.router.navigate(['/']);

      this.cart = res;
      this.isLoading = false;

    }, err => this.router.navigate(['/']))

    this.cartService.totalValue.subscribe(res => {
      this.totalValue = res;
    })
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {

      if (form.value.regulamin == 0) {
        this.errorMessage = 'Zaakceptuj regulamin sklepu.'
        return
      }
      this.errorMessage = 'Uzupełnij poprawnie wszystkie pola.'

      return
    }

    if (form.value.regulamin == 0) {
      this.errorMessage = 'Zaakceptuj regulamin sklepu.'
      return
    }

    let products: any = [];

    this.isLoading = true;

    this.cart.forEach(cartItem => {
      let newItem = {
        id: cartItem.product.id,
        amount: cartItem.quantity,
        colorId: cartItem.productVersion?.id
      };

      products.push(newItem);
    })
    let pickupInPerson = Number(form.value.pickupInPerson);

    let createOrderInput = {
      town: form.value.town,
      userName: form.value.userName,
      street: form.value.street,
      postCode: form.value.postCode,
      email: form.value.email,
      phone: form.value.phone,
      pickupInPerson: pickupInPerson,
      products: products
    }
    this.shopService.createOrder(createOrderInput).subscribe(res => {
      this.cartService.deleteSavedCart();
      this.cartService.resetCart();
      window.open(res.data?.createOrder);
      this.isSuccess = true;
      this.isError = false;
    }, err => {
      this.errorMessage = err;
      this.isSuccess = false;
      this.isError = true;
      this.isLoading = false;

      this.alertService.error('Coś poszło nie tak :( Prosimy spróbować ponownie', this.options)

    })
  }

  isStillPromo(dateToCheck: Date) {
    let currDate: Date = new Date();
    let promoDate: Date = new Date(dateToCheck);

    return currDate <= promoDate;
  }
}
