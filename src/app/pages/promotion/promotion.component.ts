import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Promotion } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  url = environment.apiUrl;

  promotion!: Promotion;

  isLoading: boolean = true;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shopService.getPromotion(params['id']).subscribe(res => {
        this.promotion = res.data.promotion;
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }
}
