import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Product } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  isLoading: boolean = true;
  group!: Group;
  products: Array<Product> = [];
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.shopService.getGroupsProducts(params['id']).subscribe(
          (res) => {
            this.group = res.data.group;
            this.group.categories.forEach((category) => {
              if (category.products.length > 0)
                this.products.push(...category.products);
            });
            this.isLoading = false;
          },
          (err) => this.router.navigate(['/'])
        );
      },
      (err) => this.router.navigate(['/'])
    );
  }
}
