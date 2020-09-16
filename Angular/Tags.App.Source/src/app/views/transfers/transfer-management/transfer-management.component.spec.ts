import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferManagementComponent } from './transfer-management.component';

describe('TransferManagementComponent', () => {
  let component: TransferManagementComponent;
  let fixture: ComponentFixture<TransferManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
