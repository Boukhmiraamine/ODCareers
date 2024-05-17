import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyConfirmationDialogComponent } from './apply-confirmation-dialog.component';

describe('ApplyConfirmationDialogComponent', () => {
  let component: ApplyConfirmationDialogComponent;
  let fixture: ComponentFixture<ApplyConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(ApplyConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
