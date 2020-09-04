import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdTicketComponent } from './hd-ticket.component';

describe('HdTicketComponent', () => {
  let component: HdTicketComponent;
  let fixture: ComponentFixture<HdTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
