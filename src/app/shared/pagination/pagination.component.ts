import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { Category, Product, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() pageName!: string;
  @Input() type!: string;
  @Input() totalItems!: number;
  @Input() options: any = {};
  @Input() products: Product[] = [];
  @Input() priceMin!: number;
  @Input() priceMax!: number;
  @Input() productsLoading!: boolean;
  @Output() newOptions = new EventEmitter<Object>();

  sortDirection: number = 0;

  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
  };

  groups: any[] = [];
  rooms!: Room[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getAllGroups().subscribe((res) => {
      res.data.groups.forEach(group => {
        let object = {
          name: group.name,
          id: group.id,
          isChecked: false
        };

        this.groups.push(object);
      });

      console.log(this.groups)
    });

    if(this.type !== 'rooms') {
      this.shopService.getAllRooms().subscribe((res) => {
        this.rooms = res.data.rooms;
      });
    }

    this.sliderOptions.floor = this.priceMin;
    this.sliderOptions.ceil = this.priceMax;
  }

  search() {
    let options: any = {};
    
    if(this.priceMin) options['priceMin'] = this.priceMin;
    if(this.priceMax) options['priceMax'] = this.priceMax;
    if(this.sortDirection == 0) options['sortDirection'] = 0;
    if(this.sortDirection == 1) options['sortDirection'] = 'ASC';
    if(this.sortDirection == 2) options['sortDirection'] = 'DESC';

    this.newOptions.emit(options);
  }
}
