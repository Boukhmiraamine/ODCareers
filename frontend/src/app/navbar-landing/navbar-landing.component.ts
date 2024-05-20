import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.css']
})
export class NavbarLandingComponent implements OnInit {
  isLoggedIn = false;
  dropdownOpen = false;
  loggedInUserId: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.authService.loginStatus$.subscribe(status => {
      this.checkLoginStatus();
    });
  }

  checkLoginStatus(): void {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
    this.loggedInUserId = this.authService.getLoggedInUserId();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUserId = null;
    this.router.navigate(['/login']); // Redirect to login page on logout
  }
}
