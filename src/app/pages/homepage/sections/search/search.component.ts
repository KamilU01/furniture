import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Color, colors } from 'src/app/models/colors';
import { Category, Group, Room } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  colors: Array<Color> = colors;
  groups!: Array<Group>;
  categories: Array<Category> = [];
  rooms!: Array<Room>;
  selectedGroup!: string;
  selectedColors: Array<Color> = [];

  constructor(private router: Router, private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getAllGroups().subscribe((res) => {
      this.groups = res.data.groups;
    });

    this.shopService.getAllRooms().subscribe((res) => {
      this.rooms = res.data.rooms;
    });
  }

  getCategoriesByGroupId(e: any) {
    if (e.target.value) {
      this.shopService.getGroupCategories(e.target.value).subscribe((res) => {
        this.categories = res.data.group.categories;
      });
    }
  }

  onSimpleSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const phrase = form.value.searchPhrase;

    this.router.navigate(['/szukaj', phrase]);
  }

  onSearch(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let options: any = {};

    if (form.value.category) {
      options['categoryId'] = form.value.category;
    }

    if (form.value.room) {
      options['selectedRooms'] = form.value.room;
    }

    if (form.value.group) {
      options['selectedGroups'] = form.value.group;
    }

    if (form.value.heightFrom) {
      options['heightFrom'] = form.value.heightFrom;
    }

    if (form.value.heightTo) {
      options['heightTo'] = form.value.heightTo;
    }

    if (form.value.widthFrom) {
      options['widthFrom'] = form.value.widthFrom;
    }

    if (form.value.widthTo) {
      options['widthTo'] = form.value.widthTo;
    }

    if (form.value.depthFrom) {
      options['depthFrom'] = form.value.depthFrom;
    }

    if (form.value.depthTo) {
      options['depthTo'] = form.value.depthTo;
    }

    if (this.selectedColors.length) {
      options['selectedColors'] = this.selectedColors.map((color) => {
        return color.colorCode;
      });
    }

    this.router.navigate([
      '/filtruj',
      options,
    ]);
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
