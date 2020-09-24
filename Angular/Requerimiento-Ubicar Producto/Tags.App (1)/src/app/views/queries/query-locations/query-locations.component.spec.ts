import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryLocationsComponent } from './query-locations.component';

describe('QueryLocationsComponent', () => {
  let component: QueryLocationsComponent;
  let fixture: ComponentFixture<QueryLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
