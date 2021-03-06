import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/graphql';
import { SeoService } from 'src/app/services/seo.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  products!: Product[];
  totalItems!: number;
  priceMin!: number;
  priceMax!: number;
  widthMin!: number;
  widthMax!: number;
  heightMin!: number;
  heightMax!: number;
  depthMin!: number;
  depthMax!: number;

  isLoading: boolean = true;
  productsLoading: boolean = true;

  itemsPerPage: number = 25;
  options: any = {
    limit: this.itemsPerPage,
    sortField: 'price'
  };
  currPage!: number;

  group!: any;
  groupId!: string;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.shopService.getAllGroups().subscribe((res) => {
          this.group = res.data.groups.find((group) => group.shortenUrl === params['id']);
          this.seoService.changeSeoTags(this.group.name, undefined, `grupa/${this.group.shortenUrl}`);
        });
        this.groupId = params['id'];
        this.search(this.options);
      },
      (err) => this.router.navigate(['/'])
    );
  }

  search(options: any) {
    options['limit'] = this.itemsPerPage;
    options['sortField'] = 'price';

    this.productsLoading = true;

    this.shopService
    .getGroupsProductsPaginated(this.groupId, options)
    .subscribe(
      (res: any) => {
        this.totalItems = res.meta.totalItems;

        if(res.meta.data) {
          this.priceMax = res.meta.priceMax;
          this.widthMin = res.meta.widthMin;
          this.widthMax = res.meta.widthMax;
          this.heightMin = res.meta.heightMin;
          this.heightMax = res.meta.heightMax;
          this.depthMin = res.meta.depthMin;
          this.depthMax = res.meta.depthMax;
        }

        this.products = res.items;
        this.currPage = res.meta.currentPage;
        this.productsLoading = false;
        this.isLoading = false;
      },
      (err) => this.router.navigate(['/'])
    );
  }
}
