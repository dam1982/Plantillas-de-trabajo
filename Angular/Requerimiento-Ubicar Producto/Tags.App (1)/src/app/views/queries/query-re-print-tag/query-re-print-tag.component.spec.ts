import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryRePrintTagComponent } from './query-re-print-tag.component';

describe('QueryRePrintTagComponent', () => {
  let component: QueryRePrintTagComponent;
  let fixture: ComponentFixture<QueryRePrintTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryRePrintTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryRePrintTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
