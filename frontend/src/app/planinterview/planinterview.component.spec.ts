import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaninterviewComponent } from './planinterview.component';

describe('PlaninterviewComponent', () => {
  let component: PlaninterviewComponent;
  let fixture: ComponentFixture<PlaninterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaninterviewComponent]
    });
    fixture = TestBed.createComponent(PlaninterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
