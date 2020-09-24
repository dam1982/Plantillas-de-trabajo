import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedataorderComponent } from './updatedataorder.component';

describe('UpdatedataorderComponent', () => {
  let component: UpdatedataorderComponent;
  let fixture: ComponentFixture<UpdatedataorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedataorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedataorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
