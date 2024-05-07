import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyJobOfferDialogComponent } from './modify-job-offer-dialog.component';

describe('ModifyJobOfferDialogComponent', () => {
  let component: ModifyJobOfferDialogComponent;
  let fixture: ComponentFixture<ModifyJobOfferDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyJobOfferDialogComponent]
    });
    fixture = TestBed.createComponent(ModifyJobOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
