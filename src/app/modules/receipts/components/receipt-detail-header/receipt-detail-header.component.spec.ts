import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailHeaderComponent } from './receipt-detail-header.component';

describe('ReceiptDetailHeaderComponent', () => {
  let component: ReceiptDetailHeaderComponent;
  let fixture: ComponentFixture<ReceiptDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptDetailHeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
