import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLandingComponent } from './navbar-landing.component';

describe('NavbarLandingComponent', () => {
  let component: NavbarLandingComponent;
  let fixture: ComponentFixture<NavbarLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarLandingComponent]
    });
    fixture = TestBed.createComponent(NavbarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
