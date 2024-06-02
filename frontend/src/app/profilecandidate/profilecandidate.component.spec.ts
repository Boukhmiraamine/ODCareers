import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecandidateComponent } from './profilecandidate.component';

describe('ProfilecandidateComponent', () => {
  let component: ProfilecandidateComponent;
  let fixture: ComponentFixture<ProfilecandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilecandidateComponent]
    });
    fixture = TestBed.createComponent(ProfilecandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
