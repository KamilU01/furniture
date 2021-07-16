import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetCategories, getFaqsQuery, GET_CATEGORIES_QUERY, GET_FAQS_QUERY } from '../models/graphql';

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
}
