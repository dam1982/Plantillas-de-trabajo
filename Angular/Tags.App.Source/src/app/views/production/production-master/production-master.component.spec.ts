import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMasterComponent } from './production-master.component';

describe('ProductionMasterComponent', () => {
  let component: ProductionMasterComponent;
  let fixture: ComponentFixture<ProductionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
