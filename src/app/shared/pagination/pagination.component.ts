import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Category, Product, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { Color, colors } from 'src/app/models/colors';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pageName!: string;
  @Input() type!: string;
  @Input() totalItems!: number;
  @Input() options: any = {};
  @Input() products: Product[] = [];
  @Input() priceMax!: number;
  @Input() widthMin!: number;
  @Input() widthMax!: number;
  @Input() heightMin!: number;
  @Input() heightMax!: number;
  @Input() depthMin!: number;
  @Input() depthMax!: number;
  @Input() itemsPerPage!: number;
  @Input() productsLoading!: boolean;
  @Input() currPage!: number;
  @Output() newOptions = new EventEmitter<Object>();
  priceMin: number = 0;
  widthMinModel!: number;
  widthMaxModel!: number;
  heightMinModel!: number;
  heightMaxModel!: number;
  depthMinModel!: number;
  depthMaxModel!: number;

  colors: Array<Color> = colors;

  sortDirection: number = 0;

  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
  };

  groups: any[] = [];
  rooms: any[] = [];
  selectedColors: Array<Color> = [];

  isMobileFiltersOpen: boolean = true;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    if (this.type !== 'groups') {
      this.shopService.getAllGroups().subscribe((res) => {
        res.data.groups.forEach((group) => {
          let object = {
            name: group.name,
            id: group.id,
            isChecked: false,
          };
          this.groups.push(object);
        });
      });
    }

    if (this.type !== 'rooms') {
      this.shopService.getAllRooms().subscribe((res) => {
        res.data.rooms.forEach((room) => {
          let object = {
            name: room.name,
            id: room.id,
            isChecked: false,
          };
          this.rooms.push(object);
        });
      });
    }

    this.sliderOptions.ceil = this.priceMax;
  }

  search(page?: number) {
    let options: any = {};

    if (page) options['page'] = page;
    if (this.priceMin) options['priceMin'] = this.priceMin;
    if (this.priceMax) options['priceMax'] = this.priceMax;
    if (this.sortDirection == 0) options['sortDirection'] = 0;
    if (this.sortDirection == 1) options['sortDirection'] = 'ASC';
    if (this.sortDirection == 2) options['sortDirection'] = 'DESC';
    if (this.selectedColors.length)
      options['selectedColors'] = JSON.stringify(this.selectedColors);
    if (this.widthMinModel) options['widthMin'] = this.widthMinModel;
    if (this.widthMaxModel) options['widthMax'] = this.widthMaxModel;
    if (this.depthMinModel) options['depthMin'] = this.depthMinModel;
    if (this.depthMaxModel) options['depthMax'] = this.depthMaxModel;
    if (this.heightMinModel) options['heightMin'] = this.heightMinModel;
    if (this.heightMaxModel) options['heightMax'] = this.heightMaxModel;

    if (this.type !== 'rooms') {
      let selectedRooms: string[] = [];
      this.rooms
        .filter((room) => room.isChecked == true)
        .map((room) => selectedRooms.push(room.id));

      if (selectedRooms.length)
        options['selectedRooms'] = JSON.stringify(selectedRooms);
    }

    if (this.type !== 'groups') {
      let selectedGroups: string[] = [];
      this.groups
        .filter((group) => group.isChecked == true)
        .map((group) => selectedGroups.push(group.id));

      if (selectedGroups.length)
        options['selectedGroups'] = JSON.stringify(selectedGroups);
    }

    this.newOptions.emit(options);
  }

  selectColor(color: Color) {
    if (this.selectedColors.includes(color)) {
      let index = this.selectedColors.indexOf(color);
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }

    this.search();
  }

  onPageChange(event: any) {
    this.search(event);
  }

  activeMobileFilters() {
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen;
  }
}
