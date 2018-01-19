import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStudentInfoComponent } from './modify-student-info.component';

describe('ModifyStudentInfoComponent', () => {
  let component: ModifyStudentInfoComponent;
  let fixture: ComponentFixture<ModifyStudentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyStudentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyStudentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
