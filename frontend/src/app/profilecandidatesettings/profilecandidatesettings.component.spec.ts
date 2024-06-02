import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecandidatesettingsComponent } from './profilecandidatesettings.component';

describe('ProfilecandidatesettingsComponent', () => {
  let component: ProfilecandidatesettingsComponent;
  let fixture: ComponentFixture<ProfilecandidatesettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilecandidatesettingsComponent]
    });
    fixture = TestBed.createComponent(ProfilecandidatesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
