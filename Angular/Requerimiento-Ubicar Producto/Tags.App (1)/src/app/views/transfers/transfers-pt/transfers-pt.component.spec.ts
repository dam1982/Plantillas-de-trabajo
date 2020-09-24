import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersPTComponent } from './transfers-pt.component';

describe('TransfersPTComponent', () => {
  let component: TransfersPTComponent;
  let fixture: ComponentFixture<TransfersPTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfersPTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
