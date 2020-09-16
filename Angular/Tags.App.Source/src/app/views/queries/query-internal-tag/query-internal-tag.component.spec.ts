import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryInternalTagComponent } from './query-internal-tag.component';

describe('QueryInternalTagComponent', () => {
  let component: QueryInternalTagComponent;
  let fixture: ComponentFixture<QueryInternalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryInternalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryInternalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
