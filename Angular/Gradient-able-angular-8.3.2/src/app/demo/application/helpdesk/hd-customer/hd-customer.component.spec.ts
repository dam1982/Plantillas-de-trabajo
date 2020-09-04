import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdCustomerComponent } from './hd-customer.component';

describe('HdCustomerComponent', () => {
  let component: HdCustomerComponent;
  let fixture: ComponentFixture<HdCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
