import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentOrderComponent } from './enlistment-order.component';

describe('EnlistmentOrderComponent', () => {
  let component: EnlistmentOrderComponent;
  let fixture: ComponentFixture<EnlistmentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlistmentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistmentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
