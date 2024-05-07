import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferModalViewComponent } from './job-offer-modal-view.component';

describe('JobOfferModalViewComponent', () => {
  let component: JobOfferModalViewComponent;
  let fixture: ComponentFixture<JobOfferModalViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobOfferModalViewComponent]
    });
    fixture = TestBed.createComponent(JobOfferModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
