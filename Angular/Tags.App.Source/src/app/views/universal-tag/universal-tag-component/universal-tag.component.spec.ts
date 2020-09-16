import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalTagComponent } from './universal-tag.component';

describe('UniversalTagComponent', () => {
  let component: UniversalTagComponent;
  let fixture: ComponentFixture<UniversalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
