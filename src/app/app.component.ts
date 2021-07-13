import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCookies: string | null = '';

  title = 'Maxii Home';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isCookies = window.localStorage.getItem('cookies');
    this.authService.autoLogin();
  }

  acceptCookies() {
    this.isCookies = 'accepted';
    window.localStorage.setItem('cookies', 'accepted');
  }
}
