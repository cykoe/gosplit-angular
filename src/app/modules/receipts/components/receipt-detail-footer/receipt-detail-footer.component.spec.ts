import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDetailFooterComponent } from './receipt-detail-footer.component';

describe('ReceiptDetailHeaderComponent', () => {
  let component: ReceiptDetailFooterComponent;
  let fixture: ComponentFixture<ReceiptDetailFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptDetailFooterComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptDetailFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
