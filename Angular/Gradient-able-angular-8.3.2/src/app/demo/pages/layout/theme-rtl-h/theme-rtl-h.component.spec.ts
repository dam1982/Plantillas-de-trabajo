import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeRtlHComponent } from './theme-rtl-h.component';

describe('ThemeRtlHComponent', () => {
  let component: ThemeRtlHComponent;
  let fixture: ComponentFixture<ThemeRtlHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeRtlHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeRtlHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
