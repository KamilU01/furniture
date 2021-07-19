import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Arrangment } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arrangment',
  templateUrl: './arrangment.component.html',
  styleUrls: ['./arrangment.component.scss']
})
export class ArrangmentComponent implements OnInit {
  url = environment.apiUrl;

  arrangment!: Arrangment;

  isLoading: boolean = true;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.shopService.getArrangmentProducts(params['id']).subscribe(res => {
        this.arrangment = res.data.arrangment;
        this.isLoading = false;
      }, err => this.router.navigate(['/']))
    }, err => this.router.navigate(['/']))
  }
}
