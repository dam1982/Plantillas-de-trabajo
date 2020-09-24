import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPalletComponent } from './transfer-pallet.component';

describe('TransferPalletComponent', () => {
  let component: TransferPalletComponent;
  let fixture: ComponentFixture<TransferPalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
