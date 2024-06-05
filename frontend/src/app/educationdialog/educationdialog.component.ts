import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './educationdialog.component.html',
})
export class EducationDialogComponent {
  educationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.educationForm = this.fb.group({
      school: [data.school || '', Validators.required],
      degree: [data.degree || '', Validators.required],
      fieldOfStudy: [data.fieldOfStudy || '', Validators.required],
      startDate: [data.startDate || '', Validators.required],
      endDate: [data.endDate || '', Validators.required],
    });
  }

  saveEducation(): void {
    if (this.educationForm.valid) {
      if (this.data._id) {
        this.profileService.updateEducation(this.data._id, this.educationForm.value).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else {
        this.profileService.addEducation({ ...this.educationForm.value, candidate: this.data.candidateId }).subscribe(result => {
          this.dialogRef.close(result);
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

