import { Component, Input, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { Product } from 'src/app/models/graphql';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageName!: string;
  @Input() totalItems!: number;
  @Input() products: Product[] = [];
  @Input() priceMin!: number;
  @Input() priceMax!: number;

  sortDirection: number = 0;

  options: Options = {
    floor: 0,
    ceil: 100,
  };

  constructor() { }

  ngOnInit(): void {
    this.options.floor = this.priceMin;
    this.options.ceil = this.priceMax;
  }

}
