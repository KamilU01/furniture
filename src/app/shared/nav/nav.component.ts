import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/graphql';
import { AlertService } from 'src/app/services/alert/alert.service';
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
  groups!: Array<Group>
  cartItems!: number;
  isDropdownActive: boolean = false;
  isLoggedIn!: boolean;
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };
  constructor(private shopService: ShopService, private alertService: AlertService, private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.shopService.getAllGroups().subscribe(res => {
      this.groups = res.data.groups;
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
    this.alertService.success('Zostałeś wylogowany!', this.options)

  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const phrase = form.value.phrase;

    this.router.navigate(['/szukaj', phrase])
  }
}
