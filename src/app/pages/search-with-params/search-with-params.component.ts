import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, colors } from 'src/app/models/colors';
import { Category, Product, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search-with-params',
  templateUrl: './search-with-params.component.html',
  styleUrls: ['./search-with-params.component.scss'],
})
export class SearchWithParamsComponent implements OnInit {
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
    sortField: 'price',
  };
  currPage!: number;

  colors: Array<Color> = colors;
  categories!: Array<Category>;
  rooms!: Array<Room>;
  selectedCategory?: string;
  selectedRoom?: string;
  selectedColors: Array<Color> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if (params.selectedGroups)
      this.options['selectedGroups'] = JSON.stringify([params.selectedGroups]);
    if (params.selectedRooms)
      this.options['selectedRooms'] = JSON.stringify([params.selectedRooms]);
    if (params.heightFrom) {
      this.heightMin = params.heightFrom;
      this.options['heightMin'] = params.heightFrom;
    }
    if (params.heightTo) {
      this.heightMax = params.heightTo;
      this.options['heightMax'] = params.heightTo;
    }
    if (params.widthFrom) {
      this.widthMin = params.widthFrom;
      this.options['widthMin'] = params.widthFrom;
    }
    if (params.widthTo) {
      this.widthMax = params.widthTo;
      this.options['widthMax'] = params.widthTo;
    }
    if (params.depthFrom) {
      this.depthMin = params.depthFrom;
      this.options['depthMin'] = params.depthFrom;
    }
    if (params.depthTo) {
      this.depthMax = params.depthTo;
      this.options['depthMax'] = params.depthTo;
    }
    if (params.selectedColors) {
      let selectedColorsFromForm = params.selectedColors.split(/[,]+/); 
      let selectedColors: Color[] = [];

      selectedColorsFromForm.forEach((color: any) => {
        let selectedColor = colors.find((color2) => color2.colorCode === color);
        if (selectedColor) selectedColors.push(selectedColor);
      });

      this.options['selectedColors'] = JSON.stringify(selectedColors);
    }

    this.search(this.options);
  }

  search(options: any) {
    options['limit'] = this.itemsPerPage;
    options['sortField'] = 'price';

    this.productsLoading = true;

    this.shopService.filterProductsPaginated(options).subscribe(
      (res: any) => {
        this.totalItems = res.meta.totalItems;

        if (res.meta.data) {
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
