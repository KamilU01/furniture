import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreatePasswordResetResponse, CREATE_PASSWORD_RESET_MUTATION, GET_PASSWORD_RESET_MUTATION, LoginResponse, LOGIN_MUTATION, MeQueryResponse, ME_QUERY, RefreshTokenResponse, REFRESH_TOKEN_MUTATION, RegisterResponse, REGISTER_MUTATION, Tokens, User } from '../models/graphql';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly JWT_EXPIRES = 'JWT_EXPIRES';
  private readonly REFRESH_EXPIRES = 'REFRESH_EXPIRES';

  private loggedUser!: string | null;

  private tokenExpirationTimer: any;

  USER = new BehaviorSubject<User | null>(null);
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apollo: Apollo, private router: Router) { }

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

  getMe() {
    return this.apollo.query<MeQueryResponse>({
      query: ME_QUERY
    })
      .pipe(
        tap(user => this.doSaveUser(user.data.me))
      )
  }

  private doSaveUser(user: User) {
    this.USER.next(user);
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

    this.isLogged.next(true);

    this.autoRefreshToken((+JWT_EXPIRES) - (currDate.getTime() / 1000))
  }

  autoRefreshToken(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.refreshToken().subscribe(res => {
        this.autoRefreshToken(res.data!.refreshToken.expiresTime)
      }, err => {
        this.logoutUser()
      })
    }, expirationDuration * 1000)
  }

  refreshToken() {
    return this.apollo.mutate<RefreshTokenResponse>({
      mutation: REFRESH_TOKEN_MUTATION
    })
      .pipe
      (
        tap(tokens => this.storeJwtToken(tokens.data!.refreshToken.token, tokens.data!.refreshToken.expiresTime))
      )
  }

  logoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.USER.next(null)
    clearTimeout(this.tokenExpirationTimer)
    this.isLogged.next(false);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  autoLogin() {
    const JWT_TOKEN = localStorage.getItem("JWT_TOKEN")
    const JWT_EXPIRES = localStorage.getItem("JWT_EXPIRES")
    const REFRESH_EXPIRES = localStorage.getItem("REFRESH_EXPIRES")
    const REFRESH_TOKEN = localStorage.getItem("REFRESH_TOKEN")

    if (!JWT_TOKEN || !JWT_EXPIRES || !REFRESH_EXPIRES || !REFRESH_TOKEN) {
      this.logoutUser()
      return
    }

    if (this.isExpired(+REFRESH_EXPIRES) == true) {
      this.logoutUser()
      return
    }

    if (this.isExpired(+JWT_EXPIRES) == true) {
      this.refreshToken().subscribe(res => {
        this.autoRefreshToken(res.data!.refreshToken.expiresTime)
        this.isLogged.next(true);
      }, err => {
        this.logoutUser()
      })
    } else {
      const currDate = new Date();
      this.autoRefreshToken((+JWT_EXPIRES) - (currDate.getTime() / 1000))
      this.isLogged.next(true);
    }
  }

  isExpired(time: number) {
    const currDate = new Date();

    if ((currDate.getTime() / 1000) <= time) {
      return false;
    } else {
      return true;
    }
  }

  resetPassword(email: string) {
    return this.apollo.mutate<CreatePasswordResetResponse>({
      mutation: CREATE_PASSWORD_RESET_MUTATION,
      variables: {
        createPasswordResetInput: {
          email
        }
      }
    })
  }

  resetPasswordConfirmation(id: string, password: string, passwordConfirm: string) {
    return this.apollo.mutate<CreatePasswordResetResponse>({
      mutation: GET_PASSWORD_RESET_MUTATION,
      variables: {
        getPasswordResetInput: {
          id,
          password,
          passwordConfirm
        }
      }
    })
  }

  private storeJwtToken(jwt: string, expires: number) {
    let currDate = new Date();

    const JWT_EXPIRES = (currDate.getTime() / 1000) + expires;

    localStorage.setItem(this.JWT_TOKEN, jwt);
    localStorage.setItem(this.JWT_EXPIRES, JWT_EXPIRES.toString());
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.REFRESH_EXPIRES);
    localStorage.removeItem(this.JWT_EXPIRES);
  }
}
