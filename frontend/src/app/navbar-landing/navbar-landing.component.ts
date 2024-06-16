import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { JobService } from '../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.css']
})
export class NavbarLandingComponent implements OnInit {
  isLoggedIn = false;
  dropdownOpen = false;
  notificationDropdownOpen = false;
  loggedInUserId: string | null = null;
  notifications: any[] = [];
  userType: 'Candidate' | 'Recruiter' | null = null;

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.authService.loginStatus$.subscribe(status => {
      this.checkLoginStatus();
      if (this.isLoggedIn) {
        this.fetchNotifications();
      }
    });
  }

  checkLoginStatus(): void {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.userType = this.authService.getLoggedInUserType() as 'Candidate' | 'Recruiter' | null;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleNotificationDropdown(): void {
    this.notificationDropdownOpen = !this.notificationDropdownOpen;
  }

  fetchNotifications(): void {
    if (this.loggedInUserId) {
      if (this.userType === 'Recruiter') {
        this.jobService.getRecruiterNotifications(this.loggedInUserId).subscribe(
          response => {
            this.notifications = response;
          },
          error => {
            console.error('Error fetching recruiter notifications', error);
          }
        );
      } else if (this.userType === 'Candidate') {
        this.jobService.getCandidateNotifications(this.loggedInUserId).subscribe(
          response => {
            this.notifications = response;
          },
          error => {
            console.error('Error fetching candidate notifications', error);
          }
        );
      }
    }
  }

  markAsRead(notificationId: string): void {
    this.jobService.markNotificationRead(notificationId).subscribe(
      () => {
        this.notifications = this.notifications.filter(n => n._id !== notificationId);
      },
      error => {
        console.error('Error marking notification as read', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUserId = null;
    this.userType = null;
    this.router.navigate(['/login']); // Redirect to login page on logout
  }
}
