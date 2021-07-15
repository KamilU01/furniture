import { Component, OnInit, Renderer2 } from '@angular/core';
import { faq } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs!: Array<faq>;
  isLoading: boolean = true;

  constructor(private renderer: Renderer2, private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getAllFaqs().subscribe(res => {
      this.faqs = res.data.faqs;
      this.isLoading = false;
    })
  }

  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);

    if (hasClass) {
      this.renderer.removeClass(event.target, className);
    } else {
      this.renderer.addClass(event.target, className);
    }
  }
}
