import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { GetCategories, getFaqsQuery, getProductResponse, GetProducts, GetRooms, GET_CATEGORIES_QUERY, GET_FAQS_QUERY, GET_NEWEST_PRODUCTS_QUERY, GET_PRODUCT_QUERY, GET_ROOMS_QUERY, Product } from '../models/graphql';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  lastViewedList: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);

  constructor(private apollo: Apollo) { }

  getAllFaqs() {
    return this.apollo.query<getFaqsQuery>({
      query: GET_FAQS_QUERY,
    })
  }

  getAllCategories() {
    return this.apollo.query<GetCategories>({
      query: GET_CATEGORIES_QUERY,
    })
  }

  getNewsetsProducts() {
    return this.apollo.query<GetProducts>({
      query: GET_NEWEST_PRODUCTS_QUERY
    })
  }

  getAllRooms() {
    return this.apollo.query<GetRooms>({
      query: GET_ROOMS_QUERY,
    })
  }

  findProductById(id: string) {
    return this.apollo.query<getProductResponse>({
      query: GET_PRODUCT_QUERY,
      variables: {
        id
      }
    })
  }

  getLastViewedProducts() {
    return this.lastViewedList;
  }

  addToLastViewedProducts(product: Product) {
    let current = this.lastViewedList.getValue();

    let dup = current.find(c => c.id === product.id);
    if (dup) {
      let index = current.indexOf(dup);
      if (index > -1) {
        current.splice(index, 1);
      }
      current.unshift(product);
    }
    else {
      current.unshift(product);
    }
    if (current.length > 6) {
      current.splice(6)
    }

    this.lastViewedList.next(current);

    localStorage.setItem('lastViewedList', JSON.stringify(current));
  }

  loadLastViewedProducts() {
    let lastViewedProducts: any = localStorage.getItem('lastViewedList')
    if (lastViewedProducts)
      this.lastViewedList.next(JSON.parse(lastViewedProducts));
  }
}
