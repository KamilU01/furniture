import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  isPromotionsAvailable: boolean = true;

  constructor(private seoService: SeoService) {
    this.seoService.changeSeoTags();
  }

  ngOnInit(): void {}

  isPromotions(e: any) {
    this.isPromotionsAvailable = e;
  }
}
