import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { ShopService } from 'src/app/services/shop.service';
import { cartItem, Color, Photo, Product, productVersion } from 'src/app/models/graphql';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert/alert.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  isLoading: boolean = true;

  product!: Product;

  subscription!: Subscription;
  urlSubscription!: Subscription;

  url = environment.apiUrl;
  amountText!: string;

  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  isPromo!: boolean;

  promoPercentage!: string | null;

  colorsProductVersions!: Product[];
  dimensionsProductVersions!: Product[];

  currPhoto!: string;
  selectedProductPhoto!: string;

  config: SwiperOptions = {
    slidesPerView: 4,
  };

  truncateText!: string | null;

  selectedColorVersion?: Color;

  colors!: Color[];

  deliveryCostText!: string;

  constructor(
    private router: Router,
    protected alertService: AlertService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.params.subscribe(
      (params) => {
        this.subscription = this.shopService
          .findProductById(params['id'])
          .subscribe(
            (res) => {
              this.product = res.data.product;
              this.currPhoto = this.product.photo;
              this.selectedProductPhoto = this.product.photo;
              this.shopService.addToLastViewedProducts(this.product);
              
              this.product.deliveryCost ? this.deliveryCostText = `+ dostawa ${this.product.deliveryCost} zł` : this.deliveryCostText = 'i darmowa dostawa';

              if (this.product.productVersions)
                this.sortProductVersions(this.product.productVersions);

              if (this.product.amount < 5) this.amountText = 'na wyczerpaniu';
              if (this.product.amount >= 5) this.amountText = 'dostępny';

              if(this.product.description.length > 300) {
                this.truncateDesc(this.product.description);
              } else {
                this.truncateText = null;
              }

              if (this.product.colors) {
                this.selectedColorVersion = this.product.colors.find(item => item.isMainPhoto);
                this.colors = this.product.colors.filter(color => color.isHidden === false);
              }

              if (this.product.promoEndDate) {
                let currDate: Date = new Date();
                let promoDate: Date = new Date(this.product.promoEndDate);
                this.isPromo = currDate <= promoDate;

                this.promoPercentage = (
                  ((this.product.price - this.product.promoPrice) * 100) /
                  this.product.price
                ).toFixed(0);
              } else {
                this.isPromo = false;
              }
              this.isLoading = false;
            },
            (err) => this.router.navigate(['/'])
          );
      },
      (err) => this.router.navigate(['/'])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.urlSubscription.unsubscribe();
  }

  addToCart(product: Product) {
    let newCartProduct: cartItem = {
      product: product, 
      quantity: 1,
    }
    
    if(this.selectedColorVersion) {
      newCartProduct['productVersion'] = this.selectedColorVersion;
    }

    this.cartService.addToCart(newCartProduct);
    this.alertService.success(
      'Produkt został dodany do koszyka!',
      this.options
    );
  }

  addToFavourites(product: Product) {
    this.alertService.success('Produkt został zapisany!', this.options);
    this.shopService.addToFavourites(product);
  }

  isStillPromo(dateToCheck: Date) {
    let currDate: Date = new Date();
    let promoDate: Date = new Date(dateToCheck);

    return currDate <= promoDate;
  }

  sortProductVersions(productVersions: productVersion[]) {
    productVersions.forEach((productVersion) => {
      switch (productVersion.versionType) {
        case 1:
          this.dimensionsProductVersions = productVersion.products;
          break;
        case 2:
          this.colorsProductVersions = productVersion.products;
          break;
      }
    });
  }

  changeCurrPhoto(photo: string, mouseEnter: boolean) {
    if (mouseEnter) {
      this.currPhoto = photo;
    } else {
      this.currPhoto = this.selectedProductPhoto;
    }
  }

  changeCurrPhotoForColor(color: Color, mouseEnter: boolean) {
    if (mouseEnter) {
      if (!color.isMainPhoto && color.photo) {
        this.currPhoto = color.photo;
      } 
    } else {
      this.currPhoto = this.selectedProductPhoto;
    }
  }

  onSlideChange(photo: Photo) {
    this.currPhoto = photo.id;
    this.selectedProductPhoto = photo.id;
  }

  truncateDesc(desc: string) {
    this.truncateText =  `${desc.substring(0, 800)}...`;
  }

  selectVersion(color: Color) {
    if (!color.isMainPhoto && color.photo) {
      this.selectedProductPhoto = color.photo;
    } else {
      this.selectedProductPhoto = this.product.photo;
    }
    this.selectedColorVersion = color;
  }
}
