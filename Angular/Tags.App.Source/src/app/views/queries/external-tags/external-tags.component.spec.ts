import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTagsComponent } from './external-tags.component';

describe('ExternalTagsComponent', () => {
  let component: ExternalTagsComponent;
  let fixture: ComponentFixture<ExternalTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
