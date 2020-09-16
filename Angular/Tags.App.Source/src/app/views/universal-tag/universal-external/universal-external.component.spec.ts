import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalExternalComponent } from './universal-external.component';

describe('UniversalExternalComponent', () => {
  let component: UniversalExternalComponent;
  let fixture: ComponentFixture<UniversalExternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalExternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
