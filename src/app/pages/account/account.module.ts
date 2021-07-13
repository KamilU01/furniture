import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { DataComponent } from './data/data.component';
import { HistoryComponent } from './history/history.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    DataComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ]
})
export class AccountModule { }
