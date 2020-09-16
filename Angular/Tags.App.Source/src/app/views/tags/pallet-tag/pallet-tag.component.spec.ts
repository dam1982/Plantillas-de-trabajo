import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletTagComponent } from './pallet-tag.component';

describe('PalletTagComponent', () => {
  let component: PalletTagComponent;
  let fixture: ComponentFixture<PalletTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
