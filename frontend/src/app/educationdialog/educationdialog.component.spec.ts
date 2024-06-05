import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationdialogComponent } from './educationdialog.component';

describe('EducationdialogComponent', () => {
  let component: EducationdialogComponent;
  let fixture: ComponentFixture<EducationdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationdialogComponent]
    });
    fixture = TestBed.createComponent(EducationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
