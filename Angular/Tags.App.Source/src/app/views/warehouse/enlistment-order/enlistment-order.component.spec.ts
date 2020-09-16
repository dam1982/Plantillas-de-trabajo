import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistmentEditComponent } from './enlistment-edit.component';

describe('EnlistmentEditComponent', () => {
  let component: EnlistmentEditComponent;
  let fixture: ComponentFixture<EnlistmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnlistmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
