import { Component, OnInit } from '@angular/core';
import { Arrangment } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-arrangments',
  templateUrl: './arrangments.component.html',
  styleUrls: ['./arrangments.component.scss']
})
export class ArrangmentsComponent implements OnInit {
  isLoading: boolean = true;
  arrangments!: Array<Arrangment>;
  url = environment.apiUrl;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getArrangments().subscribe(res => {
      this.arrangments = res.data.arrangments;
      this.isLoading = false;
    })
  }

}
