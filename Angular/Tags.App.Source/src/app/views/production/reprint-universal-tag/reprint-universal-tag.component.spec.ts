import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprintUniversalTagComponent } from './reprint-universal-tag.component';

describe('ReprintUniversalTagComponent', () => {
  let component: ReprintUniversalTagComponent;
  let fixture: ComponentFixture<ReprintUniversalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprintUniversalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprintUniversalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
