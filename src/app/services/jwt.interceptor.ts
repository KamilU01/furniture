import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(public authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken()!, this.authService.getRefreshToken()!);
    }

    return next.handle(request)
  }

  private addToken(request: HttpRequest<any>, token: string, refreshToken: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'refreshToken': `${refreshToken}`
      }
    });
  }
}