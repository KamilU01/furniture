import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
})
export class RegulationsComponent implements OnInit {
  constructor(private seoService: SeoService) {
    this.seoService.changeSeoTags('Regulamin', undefined, 'regulamin');
  }

  ngOnInit(): void {}
}
