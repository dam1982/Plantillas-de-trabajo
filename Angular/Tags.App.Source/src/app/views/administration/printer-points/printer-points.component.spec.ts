import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterPointsComponent } from './printer-points.component';

describe('PrinterPointsComponent', () => {
  let component: PrinterPointsComponent;
  let fixture: ComponentFixture<PrinterPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
