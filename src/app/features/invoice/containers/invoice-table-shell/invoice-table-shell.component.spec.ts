import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTableShellComponent } from './invoice-table-shell.component';

describe('ReceiptListContainerComponent', () => {
  let component: InvoiceTableShellComponent;
  let fixture: ComponentFixture<InvoiceTableShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTableShellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTableShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
