import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerIframeComponent } from './banner-iframe.component';

describe('BannerIframeComponent', () => {
  let component: BannerIframeComponent;
  let fixture: ComponentFixture<BannerIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
