import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvRangeSliderComponent } from './adv-range-slider.component';

describe('AdvRangeSliderComponent', () => {
  let component: AdvRangeSliderComponent;
  let fixture: ComponentFixture<AdvRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
