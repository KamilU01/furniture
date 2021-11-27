import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Promotion } from 'src/app/models/graphql';
import { ShopService } from 'src/app/services/shop.service';
import { environment } from 'src/environments/environment';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
})
export class PromotionsComponent implements OnInit {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  @ViewChild('promotionsList', { static: false }) promotionsList?: ElementRef;
  @Output() isPromotions = new EventEmitter<boolean>();
  promotions!: Array<Promotion>;
  isLoading: boolean = true;
  url = environment.apiUrl;

  currentIndex!: number;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 60,
    loop: true,
  };

  onSlideChange(e: any) {
    this.refreshPromotionList(e.realIndex);
  }

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getPromotions().subscribe(
      (res) => {
        if (res.data?.promotions && res.data?.promotions.length > 0) this.isPromotions.emit(true);
        else this.isPromotions.emit(false);

        this.promotions = res
          .data!.promotions.filter((a) => {
            return a.visibility == true;
          })
          .sort((a, b) => {
            return b.position - a.position;
          });
        this.currentIndex = 0;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  slideTo(index: number) {
    this.swiperRef!.swiperRef.slideTo(index + 1, 0);
  }

  refreshPromotionList(index: number) {
    this.promotionsList?.nativeElement.children[
      this.currentIndex
    ].classList.remove('active');
    this.promotionsList?.nativeElement.children[index].classList.add('active');

    this.currentIndex = index;
  }
}
