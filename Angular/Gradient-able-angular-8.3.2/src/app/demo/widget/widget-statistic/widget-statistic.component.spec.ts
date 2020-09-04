import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetStatisticComponent } from './widget-statistic.component';

describe('WidgetStatisticComponent', () => {
  let component: WidgetStatisticComponent;
  let fixture: ComponentFixture<WidgetStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
