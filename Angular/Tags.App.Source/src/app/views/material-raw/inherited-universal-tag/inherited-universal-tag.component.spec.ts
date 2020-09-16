import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritedUniversalTagComponent } from './inherited-universal-tag.component';

describe('InheritedUniversalTagComponent', () => {
  let component: InheritedUniversalTagComponent;
  let fixture: ComponentFixture<InheritedUniversalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InheritedUniversalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InheritedUniversalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
