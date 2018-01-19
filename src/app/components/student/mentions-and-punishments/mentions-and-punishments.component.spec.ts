import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsAndPunishmentsComponent } from './mentions-and-punishments.component';

describe('MentionsAndPunishmentsComponent', () => {
  let component: MentionsAndPunishmentsComponent;
  let fixture: ComponentFixture<MentionsAndPunishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionsAndPunishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionsAndPunishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
