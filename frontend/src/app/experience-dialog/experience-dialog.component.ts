import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-experience-dialog',
  templateUrl: './experience-dialog.component.html',
})
export class ExperienceDialogComponent {
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<ExperienceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.experienceForm = this.fb.group({
      company: [data.company || '', Validators.required],
      position: [data.position || '', Validators.required],
      startDate: [data.startDate || '', Validators.required],
      endDate: [data.endDate || '', Validators.required],
    });
  }

  saveExperience(): void {
    if (this.experienceForm.valid) {
      if (this.data._id) {
        this.profileService.updateExperience(this.data._id, this.experienceForm.value).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else {
        this.profileService.addExperience({ ...this.experienceForm.value, candidate: this.data.candidateId }).subscribe(result => {
          this.dialogRef.close(result);
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
