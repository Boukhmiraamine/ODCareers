import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComfirmationApplyJobComponent } from './snackbar-comfirmation-apply-job.component';

describe('SnackbarComfirmationApplyJobComponent', () => {
  let component: SnackbarComfirmationApplyJobComponent;
  let fixture: ComponentFixture<SnackbarComfirmationApplyJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackbarComfirmationApplyJobComponent]
    });
    fixture = TestBed.createComponent(SnackbarComfirmationApplyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
