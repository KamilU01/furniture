import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getOrderById, Order } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order!: getOrderById;
  subscription!: Subscription;
  urlSubscription!: Subscription;

  isLoading: boolean = true;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(params => {
      this.subscription = this.shopService.getOrderById(params['id']).subscribe(res => {
        this.order = res.data;
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }

}
