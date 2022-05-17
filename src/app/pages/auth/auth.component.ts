import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isNotValid: boolean = false;
  isLoading: boolean = false;

  options = {
    autoClose: true,
    keepAfterRouteChange: true,
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private seoService: SeoService,
    private alertService: AlertService
  ) {
    this.seoService.changeSeoTags('Logowanie', undefined, 'autoryzacja');
  }

  ngOnInit(): void {}

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;

    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.authService.login(email, password).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
        this.alertService.success('Zostałeś zalogowany.', this.options);
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error(
          'Nie udało się zalogować :( Prosimy o ponowienie próby za chwilę lub o kontakt.',
          this.options
        );
      }
    );
  }

  onSubmitRegister(form: NgForm) {
    if (!form.valid) {
      this.isNotValid = true;
      return;
    }

    if (form.value.password !== form.value.passwordConfirm) {
      this.isNotValid = true;
      return;
    }

    this.isLoading = true;

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.register(name, email, password).subscribe(
      (res) => {
        this.isLoading = false;
        this.alertService.success(
          'Konto zostało utworzone :) Prosimy o zalogowanie się.',
          this.options
        );
      },
      (err) => {
        this.isLoading = false;
        this.alertService.error(
          'Nie udało się utworzyć konta :( Prosimy o ponowienie próby za chwilę lub o kontakt.',
          this.options
        );
      }
    );
  }
}
