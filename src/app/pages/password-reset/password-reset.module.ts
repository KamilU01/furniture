import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordResetComponent } from './password-reset.component';
import { FormsModule } from '@angular/forms';
import { PasswordResetRoutingModule } from './password-reset-routing.module';



@NgModule({
  declarations: [
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PasswordResetRoutingModule
  ]
})
export class PasswordResetModule { }
