import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isPromotionsAvailable: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  isPromotions(e: any) {
    this.isPromotionsAvailable = e;
  }
}
