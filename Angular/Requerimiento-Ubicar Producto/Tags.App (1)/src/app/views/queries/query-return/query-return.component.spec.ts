import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryReturnComponent } from './query-return.component';

describe('QueryReturnComponent', () => {
  let component: QueryReturnComponent;
  let fixture: ComponentFixture<QueryReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
