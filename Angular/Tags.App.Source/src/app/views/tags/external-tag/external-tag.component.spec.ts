import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTagComponent } from './external-tag.component';

describe('ExternalTagComponent', () => {
  let component: ExternalTagComponent;
  let fixture: ComponentFixture<ExternalTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
