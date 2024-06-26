import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { JobService } from '../job.service';
import { ProfileService } from '../profile.service'; // Import ProfileService
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
  profilePicture: string | null = null; // Add profilePicture
  fullName: string | null = null; // Add fullName

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private profileService: ProfileService, // Inject ProfileService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.authService.loginStatus$.subscribe(status => {
      this.checkLoginStatus();
      if (this.isLoggedIn) {
        this.fetchNotifications();
        this.fetchUserProfile(); // Fetch user profile details
      }
    });
  }

  checkLoginStatus(): void {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
    this.loggedInUserId = this.authService.getLoggedInUserId();
    this.userType = this.authService.getLoggedInUserType() as 'Candidate' | 'Recruiter' | null;
    if (this.isLoggedIn) {
      this.fetchUserProfile(); // Fetch user profile details on init
    }
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

  fetchUserProfile(): void {
    if (this.loggedInUserId) {
      if (this.userType === 'Candidate') {
        this.profileService.getProfile(this.loggedInUserId).subscribe(
          profile => {
            this.profilePicture = profile.profilePicture ? `http://localhost:3000${profile.profilePicture}` : 'https://via.placeholder.com/150';
            this.fullName = profile.fullName;
          },
          error => {
            console.error('Error fetching profile', error);
          }
        );
      } else if (this.userType === 'Recruiter') {
        this.profileService.getRecruiterProfile(this.loggedInUserId).subscribe(
          profile => {
            this.profilePicture = profile.companyLogo ? `http://localhost:3000${profile.companyLogo}` : 'https://via.placeholder.com/150';
            this.fullName = profile.recruiterFullName;
          },
          error => {
            console.error('Error fetching profile', error);
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
