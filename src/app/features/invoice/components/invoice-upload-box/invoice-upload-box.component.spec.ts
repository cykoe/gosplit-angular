import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUploadBoxComponent } from './invoice-upload-box.component';

describe('ReceiptUploadComponent', () => {
  let component: InvoiceUploadBoxComponent;
  let fixture: ComponentFixture<InvoiceUploadBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceUploadBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceUploadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
