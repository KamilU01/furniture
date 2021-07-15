import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getFaqsQuery, GET_FAQS_QUERY } from '../models/graphql';

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
}
