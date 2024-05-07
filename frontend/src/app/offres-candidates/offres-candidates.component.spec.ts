import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresCandidatesComponent } from './offres-candidates.component';

describe('OffresCandidatesComponent', () => {
  let component: OffresCandidatesComponent;
  let fixture: ComponentFixture<OffresCandidatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffresCandidatesComponent]
    });
    fixture = TestBed.createComponent(OffresCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
