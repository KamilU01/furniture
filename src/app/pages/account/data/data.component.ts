import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/graphql';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  user!: User | null;
  isLoading: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe(res => {
      this.user = res.data.me;
      this.isLoading = false;
    })
  }

}
