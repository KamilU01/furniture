import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.changeSeoTags('O nas', undefined, 'o-nas');
  }

  ngOnInit(): void {}
}
