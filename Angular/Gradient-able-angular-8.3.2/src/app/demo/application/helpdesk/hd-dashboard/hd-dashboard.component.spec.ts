import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdDashboardComponent } from './hd-dashboard.component';

describe('HdDashboardComponent', () => {
  let component: HdDashboardComponent;
  let fixture: ComponentFixture<HdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
