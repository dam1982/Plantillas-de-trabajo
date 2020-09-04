import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeRtlVComponent } from './theme-rtl-v.component';

describe('ThemeRtlVComponent', () => {
  let component: ThemeRtlVComponent;
  let fixture: ComponentFixture<ThemeRtlVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeRtlVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeRtlVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
