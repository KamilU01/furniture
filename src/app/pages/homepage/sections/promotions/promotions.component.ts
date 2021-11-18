import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  promotions!: Array<Promotion>;
  isLoading: boolean = true;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getPromotions().subscribe((res) => {
      this.promotions = res.data!.promotions;
    }, err => {
      console.log(err)
    });
  }
}
