import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-rodo',
  templateUrl: './rodo.component.html',
  styleUrls: ['./rodo.component.scss']
})
export class RodoComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.changeSeoTags('RODO', undefined, 'rodo');
  }

  ngOnInit(): void {
  }

}
