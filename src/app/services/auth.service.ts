import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LoginResponse, LOGIN_MUTATION, ME_QUERY, RegisterResponse, REGISTER_MUTATION, Tokens } from '../models/graphql';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly JWT_EXPIRES = 'JWT_EXPIRES';
  private readonly REFRESH_EXPIRES = 'REFRESH_EXPIRES';

  private loggedUser!: string;

  constructor(private apollo: Apollo) { }

  login(email: string, password: string) {
    return this.apollo.mutate<LoginResponse>({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password
      },
      refetchQueries: [{
        query: ME_QUERY
      }]
    })
      .pipe(
        tap(tokens => this.doLoginUser(email, tokens.data!.login.token, tokens.data!.login.refreshToken, tokens.data!.login.expiresTime)),
      );
  }

  register(name: string, email: string, password: string) {
    return this.apollo.mutate<RegisterResponse>({
      mutation: REGISTER_MUTATION,
      variables: {
        name,
        email,
        password
      }
    })
  }

  private doLoginUser(email: string, token: string, refreshToken: string, expiresTime: number) {
    this.loggedUser = email;

    let currDate = new Date();
    const JWT_EXPIRES = (currDate.getTime() / 1000) + expiresTime;
    const REFRESH_EXPIRES = (currDate.getTime() / 1000) + 604800;

    localStorage.setItem(this.JWT_TOKEN, token);
    localStorage.setItem(this.JWT_EXPIRES, JWT_EXPIRES.toString());
    localStorage.setItem(this.REFRESH_EXPIRES, REFRESH_EXPIRES.toString());
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);

    /* this.autoRefreshToken((+JWT_EXPIRES) - (currDate.getTime() / 1000)) */
  }
}
