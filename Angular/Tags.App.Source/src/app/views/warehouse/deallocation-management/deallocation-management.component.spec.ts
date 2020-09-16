import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeallocationManagementComponent } from './deallocation-management.component';

describe('DeallocationManagementComponent', () => {
  let component: DeallocationManagementComponent;
  let fixture: ComponentFixture<DeallocationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeallocationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeallocationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
