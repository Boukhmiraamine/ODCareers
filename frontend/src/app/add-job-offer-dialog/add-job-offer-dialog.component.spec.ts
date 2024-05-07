import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobOfferDialogComponent } from './add-job-offer-dialog.component';

describe('AddJobOfferDialogComponent', () => {
  let component: AddJobOfferDialogComponent;
  let fixture: ComponentFixture<AddJobOfferDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobOfferDialogComponent]
    });
    fixture = TestBed.createComponent(AddJobOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
