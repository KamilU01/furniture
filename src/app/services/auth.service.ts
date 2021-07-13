import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse, LOGIN_MUTATION, MeQueryResponse, ME_QUERY, RefreshTokenResponse, REFRESH_TOKEN_MUTATION, Tokens, User } from '../models/graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly JWT_EXPIRES = 'JWT_EXPIRES';
  private readonly REFRESH_EXPIRES = 'REFRESH_EXPIRES';
  private loggedUser!: string | null;
  USER = new BehaviorSubject<User | null>(null);
  isAdmin!: boolean;

  private tokenExpirationTimer: any;

  constructor(private apollo: Apollo, private router: Router, private storage: Storage) { }

  login(email: string, password: string) {
    return this.apollo.mutate<LoginResponse>({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password
      }
    })
      .pipe(
        tap(tokens => console.log(tokens)),
      );
  }


  /* 
  
    getMe() {
      return this.apollo.query<MeQueryResponse>({
        query: ME_QUERY
      })
        .pipe(
          tap(user => this.doSaveUser(user.data.me))
        )
    }
  
    isLoggedIn() {
      return !!this.getJwtToken();
    }
  
    refreshToken() {
      return this.apollo.mutate<RefreshTokenResponse>({
        mutation: REFRESH_TOKEN_MUTATION
      })
        .pipe
        (
          tap(tokens => this.storeJwtToken(tokens.data.refreshToken.token, tokens.data.refreshToken.expiresTime))
        )
    }
  
    autoRefreshToken(expirationDuration: any) {
      this.tokenExpirationTimer = setTimeout(() => {
        this.refreshToken().subscribe(res => {
          this.autoRefreshToken(res.data.refreshToken.expiresTime)
  
        }, err => {
          this.logoutUser()
        })
      }, expirationDuration * 1000)
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
          this.autoRefreshToken(res.data.refreshToken.expiresTime)
        }, err => {
          this.logoutUser()
        })
      } else {
        const currDate = new Date();
        this.autoRefreshToken((+JWT_EXPIRES) - (currDate.getTime() / 1000))
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
  
    getJwtToken() {
      return localStorage.getItem(this.JWT_TOKEN);
    }
  
    getRefreshToken() {
      return localStorage.getItem(this.REFRESH_TOKEN);
    }
  
    logoutUser() {
      this.loggedUser = null;
      this.router.navigate(["/auth/login"])
      this.removeTokens();
      this.USER.next(null)
      this.apollo.client.clearStore()
      clearTimeout(this.tokenExpirationTimer)
    }
  
    user() {
      return this.USER;
    }
  
    private doSaveUser(user: User) {
      this.USER.next(user);
      this.storage.set('USER', user);
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
    } */
}
function tap(arg0: (tokens: any) => void): import("rxjs").OperatorFunction<import("@apollo/client/core").FetchResult<LoginResponse, Record<string, any>, Record<string, any>>, unknown> {
  throw new Error('Function not implemented.');
}

