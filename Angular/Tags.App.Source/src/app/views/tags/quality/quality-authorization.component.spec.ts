import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAuthorizationComponent } from './quality-authorization.component';

describe('QualityAuthorizationComponent', () => {
  let component: QualityAuthorizationComponent;
  let fixture: ComponentFixture<QualityAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
