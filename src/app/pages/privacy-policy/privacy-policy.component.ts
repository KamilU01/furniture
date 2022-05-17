import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.changeSeoTags('Polityka prywatności', undefined, 'polityka-prywatnosci');
  }

  ngOnInit(): void {
  }

}
