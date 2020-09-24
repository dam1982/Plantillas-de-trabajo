import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalTagComponent } from './internal-tag.component';

describe('InternalTagComponent', () => {
  let component: InternalTagComponent;
  let fixture: ComponentFixture<InternalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
