import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/graphql';
import { SeoService } from 'src/app/services/seo.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order!: Order;
  subscription!: Subscription;
  urlSubscription!: Subscription;

  isLoading: boolean = true;

  url = environment.apiUrl;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(
      (params) => {
        this.subscription = this.shopService
          .getOrderById(params['id'])
          .subscribe(
            (res: any) => {
              this.order = res;
              this.seoService.changeSeoTags(
                `Zamówienie ${this.order.name}`,
                undefined,
                `zamowienie/${this.order.id}`
              );
              this.isLoading = false;
            },
            () => this.router.navigate(['/'])
          );
      },
      () => this.router.navigate(['/'])
    );
  }

  invoiceDownload() {
    this.shopService.invoiceDownload(this.order.id).subscribe((res) => {
      this.shopService.saveToFileSystem(res, this.order.name + '.pdf');
    });
  }

  getProductPhoto(product: any) {
    if (!product.color?.isMainPhoto && product.color?.photo) {
      return this.url + 'photos/' + product.color?.photo;
    } else {
      return product.product.photo
        ? this.url + 'photos/' + product.product.photo
        : 'assets/images/logo.svg';
    }
  }
}
