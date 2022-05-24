import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arrangment } from 'src/app/models/graphql';
import { SeoService } from 'src/app/services/seo.service';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arrangment',
  templateUrl: './arrangment.component.html',
  styleUrls: ['./arrangment.component.scss'],
})
export class ArrangmentComponent implements OnInit {
  url = environment.apiUrl;

  arrangment!: Arrangment;

  isLoading: boolean = true;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.shopService.getArrangmentProducts(params['id']).subscribe(
          (res) => {
            this.arrangment = res.data.arrangment;
            this.seoService.changeSeoTags(
              this.arrangment.name,
              this.arrangment.description.slice(0, 200).replace(/<[^>]*>?/gm, ''),
              `aranzacja/${this.arrangment.shortenUrl}`,
              this.url + 'photos/' + this.arrangment.photo
            );
            this.isLoading = false;
          },
          (err) => this.router.navigate(['/'])
        );
      },
      (err) => this.router.navigate(['/'])
    );
  }
}
