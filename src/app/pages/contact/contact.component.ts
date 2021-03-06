import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  isNotValid: boolean = false;

  constructor(
    private contactService: ContactService,
    private seoService: SeoService
  ) {
    this.seoService.changeSeoTags('Kontakt', undefined, 'kontakt');
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.isNotValid = true;
      return;
    }

    const name = form.value.name;
    const phone = form.value.phone;
    const email = form.value.email;
    const message = form.value.text;

    this.isLoading = true;

    this.contactService.sendMessage(name, phone, email, message).subscribe(
      (res) => {
        this.isNotValid = false;
        this.isLoading = false;
        this.isSuccess = true;
        this.isError = false;
      },
      (err) => {
        this.isNotValid = false;
        this.isLoading = false;
        this.isSuccess = false;
        this.isError = true;
      }
    );
  }
}
