import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isNotValid: boolean = false;
  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    if (!form.valid) {
      return
    }
    console.log("chuj")

    this.isLoading = true;

    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

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

    const email = form.value.email;
    const password = form.value.password;
  }
}
