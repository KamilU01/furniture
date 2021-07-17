import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetCategories, getFaqsQuery, GetProducts, GetRooms, GET_CATEGORIES_QUERY, GET_FAQS_QUERY, GET_NEWEST_PRODUCTS_QUERY, GET_ROOMS_QUERY } from '../models/graphql';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

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
}
