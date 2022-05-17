import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private dom: any
  ) {}

  changeSeoTags(title?: string, description?: string, canonical?: string) {
    if (title) {
      this.titleService.setTitle(`${title} | Maxii Home`);
    } else {
      this.titleService.setTitle(`Sklep Meblowy | Maxii Home`);
    }

    if (description) {
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
    } else {
      this.meta.updateTag({
        name: 'description',
        content:
          'Maxii Home „RAMETA” Istniejemy od 2005 roku. Z nami urządzisz każde pomieszczenie pokoje dzienne, młodzieżowe, sypialnie, przedpokoje, kuchnie i jadalnie. Posiadamy w swojej sprzedaży meble nowoczesne i stylizowane.',
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
      element.setAttribute('href', `https://maxiihome.pl/${canonical}`);
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
    }
  }
}
