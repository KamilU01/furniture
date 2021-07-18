import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  products!: Array<Product>;
  isLoading: boolean = true;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.favouritesList.subscribe(res => {
      this.products = res;
      this.isLoading = false;
    })
  }

}
