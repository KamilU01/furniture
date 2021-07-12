import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCookies: string | null = '';

  title = 'Maxii Home';

  ngOnInit() {
    this.isCookies = window.localStorage.getItem('cookies');
  }

  acceptCookies() {
    this.isCookies = 'accepted';
    window.localStorage.setItem('cookies', 'accepted');
  }
}
