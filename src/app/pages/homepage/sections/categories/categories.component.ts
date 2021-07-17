import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  rooms!: Array<Room>;
  subscription!: Subscription;
  isLoading: boolean = true;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.subscription = this.shopService.getAllRooms().subscribe(res => {
      this.rooms = res.data.rooms;
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
