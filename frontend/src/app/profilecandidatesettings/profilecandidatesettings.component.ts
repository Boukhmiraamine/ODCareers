import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-profilecandidatesettings',
  templateUrl: './profilecandidatesettings.component.html',
  styleUrls: ['./profilecandidatesettings.component.css']
})
export class ProfilecandidatesettingsComponent implements OnInit {
  settingsForm: FormGroup;
  selectedFile: File | null = null;
  profilePicture: string | ArrayBuffer | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      status: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getLoggedInUserId();
    if (this.userId) {
      this.profileService.getProfile(this.userId).subscribe(profile => {
        this.settingsForm.patchValue(profile);
        this.profilePicture = profile.profilePicture;
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadProfilePicture(): void {
    if (this.userId && this.selectedFile) {
      this.profileService.uploadProfilePicture(this.userId, this.selectedFile).subscribe(
        response => {
          console.log('Profile picture uploaded successfully', response);
        },
        error => {
          console.error('Error uploading profile picture', error);
        }
      );
    }
  }

  saveSettings(): void {
    if (this.userId) {
      const updatedSettings = new FormData();
      updatedSettings.append('username', this.settingsForm.get('username')?.value);
      updatedSettings.append('email', this.settingsForm.get('email')?.value);
      updatedSettings.append('fullName', this.settingsForm.get('fullName')?.value);
      updatedSettings.append('status', this.settingsForm.get('status')?.value);
      updatedSettings.append('address', this.settingsForm.get('address')?.value);
      updatedSettings.append('telephone', this.settingsForm.get('telephone')?.value);
      updatedSettings.append('age', this.settingsForm.get('age')?.value);

      this.profileService.updateProfile(this.userId, updatedSettings).subscribe(
        response => {
          console.log('Settings updated successfully', response);
        },
        error => {
          console.error('Error updating settings', error);
        }
      );
    }
  }
}
