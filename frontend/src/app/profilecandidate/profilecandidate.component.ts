import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-profilecandidate',
  templateUrl: './profilecandidate.component.html',
  styleUrls: ['./profilecandidate.component.css']
})
export class ProfilecandidateComponent implements OnInit {
  candidate: any;
  profilePicture: string | ArrayBuffer | null = null;
  userId: string | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId) {
      this.profileService.getProfile(this.userId).subscribe(profile => {
        this.candidate = profile;
        this.profilePicture = profile.profilePicture;
      });
    }
  }
}
