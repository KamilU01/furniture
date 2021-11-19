import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { CreateOrderResponse, CREATE__ORDER__MUTATION, getArrangmentProductsResponse, getArrangments, GetCategories, getCategoryProductsResponse, getFaqsQuery, getNewestProducts, getOrderById, getProductResponse, GetProducts, getPromotionById, GetPromotions, getRoomProductsResponse, GetRooms, getSearchResult, GET_ARRANGMENTS_QUERY, GET_ARRANGMENT_PRODUCTS_QUERY, GET_CATEGORIES_QUERY, GET_CATEGORY_PRODUCTS_QUERY, GET_FAQS_QUERY, GET_NEWEST_PRODUCTS_QUERY, GET_ORDER_BY_ID, GET_PRODUCT_QUERY, GET_PROMOTIONS_QUERY, GET_PROMOTION_BY_ID, GET_ROOMS_QUERY, GET_ROOM_PRODUCTS_QUERY, GET_SEARCH_RESULT, ME_QUERY, Product } from '../models/graphql';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  lastViewedList: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);
  favouritesList: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);

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

  getCategoryProducts(id: string) {
    return this.apollo.query<getCategoryProductsResponse>({
      query: GET_CATEGORY_PRODUCTS_QUERY,
      variables: {
        id
      }
    })
  }

  getNewsetsProducts() {
    return this.apollo.query<getNewestProducts>({
      query: GET_NEWEST_PRODUCTS_QUERY
    })
  }

  getAllRooms() {
    return this.apollo.query<GetRooms>({
      query: GET_ROOMS_QUERY,
    })
  }

  getRoomProducts(id: string) {
    return this.apollo.query<getRoomProductsResponse>({
      query: GET_ROOM_PRODUCTS_QUERY,
      variables: {
        id
      }
    })
  }

  getArrangments() {
    return this.apollo.query<getArrangments>({
      query: GET_ARRANGMENTS_QUERY
    })
  }

  getArrangmentProducts(id: string) {
    return this.apollo.query<getArrangmentProductsResponse>({
      query: GET_ARRANGMENT_PRODUCTS_QUERY,
      variables: {
        id
      }
    })
  }

  getSearchResult(phrase: string) {
    return this.apollo.query<getSearchResult>({
      query: GET_SEARCH_RESULT,
      variables: {
        phrase
      }
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

  getOrderById(id: string) {
    return this.apollo.query<getOrderById>({
      query: GET_ORDER_BY_ID,
      variables: {
        id
      }
    })
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

  addToFavourites(product: Product) {
    let current = this.favouritesList.getValue();

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

    this.favouritesList.next(current);

    localStorage.setItem('favouritesList', JSON.stringify(current));
  }

  loadFavourites() {
    let favouritesList: any = localStorage.getItem('favouritesList')
    if (favouritesList)
      this.favouritesList.next(JSON.parse(favouritesList));
  }

  removeFromFavourites(product: Product) {
    let current = this.favouritesList.getValue();

    let index = current.findIndex(i => i == product)

    current.splice(index, 1);
    this.favouritesList.next(current);

    localStorage.setItem('favouritesList', JSON.stringify(current));
  }

  createOrder(createOrderInput: any) {
    return this.apollo.mutate<CreateOrderResponse>({
      mutation: CREATE__ORDER__MUTATION,
      variables: {
        createOrderInput
      },
      refetchQueries: [{
        query: ME_QUERY
      }]
    })
  }

  getPromotions() {
    return this.apollo.mutate<GetPromotions>({
      mutation: GET_PROMOTIONS_QUERY
    })
  }

  getPromotion(id: string) {
    return this.apollo.query<getPromotionById>({
      query: GET_PROMOTION_BY_ID,
      variables: {
        id
      }
    })
  }
}
