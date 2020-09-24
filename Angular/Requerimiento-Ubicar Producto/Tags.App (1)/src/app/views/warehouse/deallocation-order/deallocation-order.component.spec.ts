import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallocationOrderComponent } from './deallocation-order.component';

describe('DeallocationOrderComponent', () => {
  let component: DeallocationOrderComponent;
  let fixture: ComponentFixture<DeallocationOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeallocationOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallocationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
