import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-comfirmation-apply-job',
  templateUrl: './snackbar-comfirmation-apply-job.component.html',
  styleUrls: ['./snackbar-comfirmation-apply-job.component.css']
})
export class SnackbarComfirmationApplyJobComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
