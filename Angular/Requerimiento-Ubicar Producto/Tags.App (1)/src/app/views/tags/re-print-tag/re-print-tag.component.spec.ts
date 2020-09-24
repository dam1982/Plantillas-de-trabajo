import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RePrintTagComponent } from './re-print-tag.component';

describe('RePrintTagComponent', () => {
  let component: RePrintTagComponent;
  let fixture: ComponentFixture<RePrintTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RePrintTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RePrintTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
