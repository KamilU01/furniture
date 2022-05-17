import { Component, OnInit } from '@angular/core';
import { Arrangment } from 'src/app/models/graphql';
import { SeoService } from 'src/app/services/seo.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arrangments',
  templateUrl: './arrangments.component.html',
  styleUrls: ['./arrangments.component.scss'],
})
export class ArrangmentsComponent implements OnInit {
  isLoading: boolean = true;
  arrangments!: Array<Arrangment>;
  url = environment.apiUrl;

  constructor(private shopService: ShopService, private seoService: SeoService) {
    this.seoService.changeSeoTags('Aranżacje', undefined, 'aranzacje');
  }

  ngOnInit(): void {
    this.shopService.getArrangments().subscribe((res) => {
      this.arrangments = res.data.arrangments;
      this.isLoading = false;
    });
  }
}
