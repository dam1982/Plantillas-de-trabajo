import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDeliveryComponent } from './tag-delivery.component';

describe('TagDeliveryComponent', () => {
  let component: TagDeliveryComponent;
  let fixture: ComponentFixture<TagDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
