import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SendMessageResponse, SEND_MESSAGE_MUTATION } from '../models/graphql';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apollo: Apollo) { }

  sendMessage(name: string, phone: string, email: string, message: string) {
    return this.apollo.mutate<SendMessageResponse>({
      mutation: SEND_MESSAGE_MUTATION,
      variables: {
        name,
        email,
        phone,
        message
      }
    })
  }
}
