import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCandidatsComponent } from './signup-candidats.component';

describe('SignupCandidatsComponent', () => {
  let component: SignupCandidatsComponent;
  let fixture: ComponentFixture<SignupCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCandidatsComponent]
    });
    fixture = TestBed.createComponent(SignupCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
