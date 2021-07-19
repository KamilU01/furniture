import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLoading: boolean = false;
  isNotValid: boolean = false;

  options = {
    autoClose: false,
    keepAfterRouteChange: true
  };

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
  }
  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return
    }

    this.isLoading = true;

    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.authService.login(email, password).subscribe(res => {
      this.isLoading = false;
      this.alertService.success('Zostałeś zalogowany!', this.options)
      this.router.navigate(['/podsumowanie-zamowienia']);
    }, err => {
      this.isLoading = false;
      this.alertService.error('Przepraszamy, wystąpił błąd. Prosimy spróbować później.', this.options)
    })
  }

  onSubmitRegister(form: NgForm) {
    if (!form.valid) {
      this.isNotValid = true;
      return
    }

    if (form.value.password !== form.value.passwordConfirm) {
      this.isNotValid = true;
      return
    }

    this.isLoading = true;

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.register(name, email, password).subscribe(res => {
      this.isLoading = false;
      this.alertService.success('Konto zostało utworzone!', this.options)
      this.router.navigateByUrl('/podsumowanie-zamowienia');
    }, err => {
      this.isLoading = false;
      this.alertService.error('Przepraszamy, wystąpił błąd. Prosimy spróbować później.', this.options)
    })
  }
}
