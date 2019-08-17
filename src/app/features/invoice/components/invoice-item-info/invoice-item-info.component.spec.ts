import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemInfoComponent } from './invoice-item-info.component';

describe('ReceiptItemInfoComponent', () => {
  let component: InvoiceItemInfoComponent;
  let fixture: ComponentFixture<InvoiceItemInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceItemInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
