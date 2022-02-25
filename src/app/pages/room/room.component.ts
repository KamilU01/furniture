import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  url = environment.apiUrl;

  products!: Product[];
  totalItems!: number;
  priceMin!: number;
  priceMax!: number;

  isLoading: boolean = true;
  productsLoading: boolean = true;

  itemsPerPage: number = 50;
  options: any = {
    limit: this.itemsPerPage,
    sortField: 'price'
  };

  room!: any;
  roomId!: string;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.shopService.getAllRooms().subscribe((res) => {
          this.room = res.data.rooms.find((room) => room.id === params['id']);
        });
        this.roomId = params['id'];
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
    .getRoomProductsPaginated(this.roomId, options)
    .subscribe(
      (res: any) => {
        this.totalItems = res.meta.totalItems;
        this.priceMin = res.meta.priceMin;
        this.priceMax = res.meta.priceMax;
        this.products = res.items;
        this.productsLoading = false;
        this.isLoading = false;
      },
      (err) => this.router.navigate(['/'])
    );
  }
}
