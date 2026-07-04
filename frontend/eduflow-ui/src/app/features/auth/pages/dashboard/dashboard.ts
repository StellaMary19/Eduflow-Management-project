import { Component } from '@angular/core';
import { AuthStateService } from '../../../../core/services/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  constructor(private authStateService : AuthStateService, private router : Router) {}
  logout(){
    this.authStateService.logout();
    this.router.navigate(['login']);
  }
}
