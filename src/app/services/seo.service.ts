import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import e from 'express';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private dom: any
  ) {}

  changeSeoTags(title?: string, description?: string, canonical?: string, img?: string) {
    if (title) {
      this.titleService.setTitle(`${title} | Maxii Home`);
      this.meta.updateTag({
        property: 'og:title',
        content:
        `${title} | Maxii Home`,
      });
      this.meta.updateTag({
        property: 'twitter:title',
        content:
        `${title} | Maxii Home`,
      });
    } else {
      this.titleService.setTitle(`Sklep Meblowy | Maxii Home`);
      this.meta.updateTag({
        property: 'og:title',
        content:
        'Sklep Meblowy | Maxii Home',
      });
      this.meta.updateTag({
        property: 'twitter:title',
        content:
        'Sklep Meblowy | Maxii Home',
      });
    }

    if (description) {
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: description,
      });
      this.meta.updateTag({
        property: 'twitter:description',
        content: description,
      });
    } else {
      this.meta.updateTag({
        name: 'description',
        content:
          'Maxii Home „RAMETA” Istniejemy od 2005 roku. Z nami urządzisz każde pomieszczenie pokoje dzienne, młodzieżowe, sypialnie, przedpokoje, kuchnie i jadalnie. Posiadamy w swojej sprzedaży meble nowoczesne i stylizowane.',
      });
      
      this.meta.updateTag({
        property: 'og:description',
        content: 'Maxii Home „RAMETA” Istniejemy od 2005 roku. Z nami urządzisz każde pomieszczenie pokoje dzienne, młodzieżowe, sypialnie, przedpokoje, kuchnie i jadalnie. Posiadamy w swojej sprzedaży meble nowoczesne i stylizowane.',
      });
      this.meta.updateTag({
        property: 'twitter:description',
        content: 'Maxii Home „RAMETA” Istniejemy od 2005 roku. Z nami urządzisz każde pomieszczenie pokoje dzienne, młodzieżowe, sypialnie, przedpokoje, kuchnie i jadalnie. Posiadamy w swojej sprzedaży meble nowoczesne i stylizowane.',
      });
    }

    if (canonical) {
      const head = this.dom.getElementsByTagName('head')[0];
      var element: HTMLLinkElement =
        this.dom.querySelector(`link[rel='canonical']`) || null;
      if (element == null) {
        element = this.dom.createElement('link') as HTMLLinkElement;
        head.appendChild(element);
      }
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', `https://maxiihome.pl/${canonical}/`);
      
      this.meta.updateTag({
        property: 'og:url',
        content: `https://maxiihome.pl/${canonical}/`,
      });
      this.meta.updateTag({
        property: 'twitter:url',
        content: `https://maxiihome.pl/${canonical}/`,
      });
    } else {
      const head = this.dom.getElementsByTagName('head')[0];
      var element: HTMLLinkElement =
        this.dom.querySelector(`link[rel='canonical']`) || null;
      if (element == null) {
        element = this.dom.createElement('link') as HTMLLinkElement;
        head.appendChild(element);
      }
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', 'https://maxiihome.pl/');
      this.meta.updateTag({
        property: 'og:url',
        content: 'https://maxiihome.pl/',
      });
      this.meta.updateTag({
        property: 'twitter:url',
        content: 'https://maxiihome.pl/',
      });
    }

    if(img) {
      this.meta.updateTag({
        property: 'og:image',
        content: img,
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: img,
      });
    } else {
      this.meta.updateTag({
        property: 'og:image',
        content: 'assets/images/maxiihome_card.jpg',
      });
      this.meta.updateTag({
        property: 'twitter:image',
        content: 'assets/images/maxiihome_card.jpg',
      });
    }
  }
}
