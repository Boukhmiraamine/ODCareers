import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-certification-dialog',
  templateUrl: './certification-dialog.component.html',
})
export class CertificationDialogComponent {
  certificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<CertificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.certificationForm = this.fb.group({
      name: [data.name || '', Validators.required],
      issuer: [data.issuer || '', Validators.required],
      dateObtained: [data.dateObtained || '', Validators.required],
    });
  }

  saveCertification(): void {
    if (this.certificationForm.valid) {
      if (this.data._id) {
        this.profileService.updateCertification(this.data._id, this.certificationForm.value).subscribe(result => {
          this.dialogRef.close(result);
        });
      } else {
        this.profileService.addCertification({ ...this.certificationForm.value, candidate: this.data.candidateId }).subscribe(result => {
          this.dialogRef.close(result);
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
