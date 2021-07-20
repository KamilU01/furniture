import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/graphql';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  user!: User;

  isLoading: boolean = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe(res => {
      this.user = res.data.me;
      this.isLoading = false;
    })
  }

}
