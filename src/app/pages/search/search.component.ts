import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products!: Array<Product>;
  phrase!: string;
  isLoading: boolean = true;
  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoading = true;
      this.phrase = params['phrase'];
      this.shopService.getSearchResult(params['phrase']).subscribe(res => {
        this.products = res.data.findProducts;
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }

}
