import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  query: any = {};
  products!: Product[];
  isLoading: boolean = true;

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
    this.shopService.getAllCategories().subscribe((res) => {
      this.categories = res.data.categories;
    });

    this.shopService.getAllRooms().subscribe((res) => {
      this.rooms = res.data.rooms;
    });

    const params = this.activatedRoute.snapshot.params;

    if (params.categoryId) this.query['categoryId'] = params.categoryId;
    if (params.roomId) this.query['roomId'] = params.roomId;
    if (params.heightTo) this.query['heightFrom'] = +params.heightTo;
    if (params.heightTo) this.query['heightTo'] = +params.heightTo;
    if (params.widthFrom) this.query['widthFrom'] = +params.widthFrom;
    if (params.widthTo) this.query['widthTo'] = +params.widthTo;
    if (params.depthFrom) this.query['depthFrom'] = +params.depthFrom;
    if (params.depthTo) this.query['depthTo'] = +params.depthTo;
    this.query['colors'] = params.colors.split(/[,]+/);

    let colorsArray = params.colors.split(/[,]+/);

    this.selectedCategory = params.categoryId;
    this.selectedRoom = params.roomId;

    colors.forEach((color) => {
      if (colorsArray.includes(color.colorCode))
        this.selectedColors.push(color);
    });

    this.filterProducts(this.query);
  }

  filterProducts(query: any) {
    this.isLoading = true;
    this.shopService.filterProducts(query).valueChanges.subscribe(
      (res) => {
        this.products = res.data.findProductsWithQuery;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const categoryId = form.value.category;
    const roomId = form.value.room;
    const heightFrom = form.value.heightFrom;
    const heightTo = form.value.heightTo;
    const widthFrom = form.value.widthFrom;
    const widthTo = form.value.widthTo;
    const depthFrom = form.value.depthFrom;
    const depthTo = form.value.depthTo;
    const colors = this.selectedColors.map((color) => {
      return color.colorCode;
    });

    const query = {
      categoryId,
      roomId,
      heightFrom,
      heightTo,
      widthFrom,
      widthTo,
      depthFrom,
      depthTo,
      colors,
    };

    this.router.navigate([
      '/filtruj',
      {
        categoryId,
        roomId,
        heightFrom,
        heightTo,
        widthFrom,
        widthTo,
        depthFrom,
        depthTo,
        colors,
      },
    ]);

    this.filterProducts(query);
  }

  selectColor(color: Color) {
    if (this.selectedColors.includes(color)) {
      let index = this.selectedColors.indexOf(color);
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
  }
}
