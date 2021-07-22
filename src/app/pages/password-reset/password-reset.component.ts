import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  id!: string;
  isLoading: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  isPasswordCorrect: boolean = true;

  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  constructor(private authService: AuthService, private route: ActivatedRoute, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }

    const password = form.value.password;
    const passwordConfirmation = form.value.passwordConfirm;


    if (password !== passwordConfirmation) {
      this.isPasswordCorrect = false;
      return
    }
    this.isLoading = true;

    this.authService.resetPasswordConfirmation(this.id, password, passwordConfirmation).subscribe(resData => {
      this.isLoading = false;
      this.alertService.success('Hasło zostało zmienione. Prosimy się zalogować.', this.options)
      this.router.navigate(['/autoryzacja'])
    }, err => {
      this.isLoading = false;
      this.alertService.error('Nie udało się przywrócić hasła :( Prosimy o ponowienie próby za chwilę lub o kontakt.', this.options)
    })
    form.reset();
  }
}
