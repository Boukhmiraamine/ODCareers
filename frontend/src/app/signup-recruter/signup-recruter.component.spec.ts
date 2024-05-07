import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupRecruterComponent } from './signup-recruter.component';

describe('SignupRecruterComponent', () => {
  let component: SignupRecruterComponent;
  let fixture: ComponentFixture<SignupRecruterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupRecruterComponent]
    });
    fixture = TestBed.createComponent(SignupRecruterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
