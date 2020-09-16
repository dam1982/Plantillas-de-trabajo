import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsRequestComponent } from './materials-request.component';

describe('MaterialsRequestComponent', () => {
  let component: MaterialsRequestComponent;
  let fixture: ComponentFixture<MaterialsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
