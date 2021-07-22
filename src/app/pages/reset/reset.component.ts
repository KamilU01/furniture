import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    this.isLoading = true;
    this.isError = false;
    this.isSuccess = false;

    const email = form.value.loginEmail;

    this.authService.resetPassword(email).subscribe(res => {
      this.alertService.success('Wiadomość została wysłana. Sprawdź swoją skrzynkę pocztową.', this.options)
      this.isLoading = false;
    }, err => {
      this.alertService.error('Przepraszamy, coś poszło nie tak. Prosimy spróbować ponownie.', this.options)

      this.isLoading = false;
    })

    form.reset();
  }
}
