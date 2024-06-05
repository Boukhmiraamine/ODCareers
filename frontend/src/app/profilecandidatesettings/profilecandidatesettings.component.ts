import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth-service.service';
import { EducationDialogComponent } from '../educationdialog/educationdialog.component';
import { CertificationDialogComponent } from '../certification-dialog/certification-dialog.component';
import { ExperienceDialogComponent } from '../experience-dialog/experience-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

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
  candidate: any = null;
  educationDisplayedColumns: string[] = ['school', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'actions'];
  experienceDisplayedColumns: string[] = ['company', 'position', 'startDate', 'endDate', 'actions'];
  certificationDisplayedColumns: string[] = ['name', 'issuer', 'dateObtained', 'actions'];
  educationDataSource = new MatTableDataSource<any>([]);
  experienceDataSource = new MatTableDataSource<any>([]);
  certificationDataSource = new MatTableDataSource<any>([]);

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    public dialog: MatDialog
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
      this.fetchProfile();
    }
  }

  fetchProfile(): void {
    this.profileService.getProfile(this.userId!).subscribe(profile => {
      this.candidate = profile;
      this.settingsForm.patchValue(profile);
      this.profilePicture = profile.profilePicture ? `http://localhost:3000${profile.profilePicture}` : null;
      this.educationDataSource.data = profile.educations;
      this.experienceDataSource.data = profile.experiences;
      this.certificationDataSource.data = profile.certifications;
    });
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
          this.profilePicture = `http://localhost:3000/${response.profilePicture}`; // Update the picture URL
          this.selectedFile = null; // Reset the selected file
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
          this.fetchProfile(); // Refresh profile data
        },
        error => {
          console.error('Error updating settings', error);
        }
      );
    }
  }

  openEducationDialog(education?: any): void {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '400px',
      data: education ? education : { candidateId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchProfile(); // Refresh profile data
      }
    });
  }

  openExperienceDialog(experience?: any): void {
    const dialogRef = this.dialog.open(ExperienceDialogComponent, {
      width: '400px',
      data: experience ? experience : { candidateId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchProfile(); // Refresh profile data
      }
    });
  }

  openCertificationDialog(certification?: any): void {
    const dialogRef = this.dialog.open(CertificationDialogComponent, {
      width: '400px',
      data: certification ? certification : { candidateId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchProfile(); // Refresh profile data
      }
    });
  }

  deleteEducation(educationId: string): void {
    this.profileService.deleteEducation(educationId).subscribe(
      () => {
        console.log('Education deleted successfully');
        this.fetchProfile(); // Refresh profile data
      },
      error => {
        console.error('Error deleting education', error);
      }
    );
  }

  deleteExperience(experienceId: string): void {
    this.profileService.deleteExperience(experienceId).subscribe(
      () => {
        console.log('Experience deleted successfully');
        this.fetchProfile(); // Refresh profile data
      },
      error => {
        console.error('Error deleting experience', error);
      }
    );
  }

  deleteCertification(certificationId: string): void {
    this.profileService.deleteCertification(certificationId).subscribe(
      () => {
        console.log('Certification deleted successfully');
        this.fetchProfile(); // Refresh profile data
      },
      error => {
        console.error('Error deleting certification', error);
      }
    );
  }
}
