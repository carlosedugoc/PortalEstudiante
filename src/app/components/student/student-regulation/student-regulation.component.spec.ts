import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegulationComponent } from './student-regulation.component';

describe('StudentRegulationComponent', () => {
  let component: StudentRegulationComponent;
  let fixture: ComponentFixture<StudentRegulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRegulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
