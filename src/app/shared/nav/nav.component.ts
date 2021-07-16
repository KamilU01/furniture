import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isSidebarVisible: boolean = false;
  categories!: Array<Category>

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getAllCategories().subscribe(res => {
      this.categories = res.data.categories;
    })
  }

}
