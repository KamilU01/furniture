import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/graphql';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  url = environment.apiUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
