import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private seoService: SeoService) { 
    this.seoService.changeSeoTags('Konto', undefined, 'konto');
  }

  ngOnInit(): void {
  }

}
