import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdCustomerListComponent } from './hd-customer-list.component';

describe('HdCustomerListComponent', () => {
  let component: HdCustomerListComponent;
  let fixture: ComponentFixture<HdCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
