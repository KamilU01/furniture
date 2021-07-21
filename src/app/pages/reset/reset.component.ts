import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private authService: AuthService) { }

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
      this.isSuccess = true;
      this.isError = false;
      this.isLoading = false;
    }, err => {
      this.isSuccess = false;
      this.isError = true;
      this.isLoading = false;
    })

    form.reset();
  }
}
