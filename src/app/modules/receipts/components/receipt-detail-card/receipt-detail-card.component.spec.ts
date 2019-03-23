import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailCardComponent } from './receipt-detail-card.component';

describe('ReceiptDetailCardComponent', () => {
  let component: ReceiptDetailCardComponent;
  let fixture: ComponentFixture<ReceiptDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
