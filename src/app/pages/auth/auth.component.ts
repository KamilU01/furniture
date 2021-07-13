import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isNotValid: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  isRegisterSuccess: boolean = false;
  isRegisterError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return
    }

    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;

    this.isRegisterSuccess = true;
    this.isRegisterError = false;

    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.authService.login(email, password).subscribe(res => {
      this.isSuccess = true;
      this.isError = false;
      this.isLoading = false;
      this.router.navigateByUrl('/');
    }, err => {
      this.isSuccess = false;
      this.isError = true;
      this.isLoading = false;
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
    this.isError = false;
    this.isSuccess = false;

    this.isRegisterSuccess = false;
    this.isRegisterError = false;

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.authService.register(name, email, password).subscribe(res => {
      this.isSuccess = false;
      this.isError = false;

      this.isRegisterSuccess = true;
      this.isRegisterError = false;

      this.isLoading = false;
    }, err => {
      this.isSuccess = false;
      this.isError = false;

      this.isRegisterSuccess = false;
      this.isRegisterError = true;

      this.isLoading = false;
    })
  }
}
