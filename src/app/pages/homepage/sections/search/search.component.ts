import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Color, colors } from 'src/app/models/colors';
import { Category, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  colors: Array<Color> = colors;
  categories!: Array<Category>;
  rooms!: Array<Room>;
  selectedCategory!: string;
  selectedColors: Array<Color> = [];

  constructor(private router: Router, private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getAllCategories().subscribe((res) => {
      this.categories = res.data.categories;
    });

    this.shopService.getAllRooms().subscribe((res) => {
      this.rooms = res.data.rooms;
    });
  }

  onSimpleSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const phrase = form.value.phrase;

    this.router.navigate(['/szukaj', phrase]);
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

    this.router.navigate(['/filtruj', {categoryId, roomId, heightFrom, heightTo, widthFrom, widthTo, depthFrom, depthTo, colors}])
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
