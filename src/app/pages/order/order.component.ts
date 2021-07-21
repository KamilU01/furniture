import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order!: Order;
  subscription!: Subscription;
  urlSubscription!: Subscription;

  isLoading: boolean = true;

  url = environment.apiUrl;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(params => {
      this.subscription = this.shopService.getOrderById(params['id']).subscribe(res => {
        this.order = res.data.order;
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }

}
