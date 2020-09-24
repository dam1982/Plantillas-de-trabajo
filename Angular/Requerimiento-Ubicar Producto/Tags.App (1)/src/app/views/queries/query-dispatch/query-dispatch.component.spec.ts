import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDispatchComponent } from './query-dispatch.component';

describe('QueryDispatchComponent', () => {
  let component: QueryDispatchComponent;
  let fixture: ComponentFixture<QueryDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
