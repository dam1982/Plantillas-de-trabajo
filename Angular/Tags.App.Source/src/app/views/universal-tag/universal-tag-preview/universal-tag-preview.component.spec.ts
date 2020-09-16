import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalTagPreviewComponent } from './universal-tag-preview.component';

describe('UniversalTagPreviewComponent', () => {
  let component: UniversalTagPreviewComponent;
  let fixture: ComponentFixture<UniversalTagPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalTagPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalTagPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
