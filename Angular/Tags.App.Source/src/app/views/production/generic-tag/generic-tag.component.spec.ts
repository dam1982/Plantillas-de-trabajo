import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTagComponent } from './generic-tag.component';

describe('GenericTagComponent', () => {
  let component: GenericTagComponent;
  let fixture: ComponentFixture<GenericTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
