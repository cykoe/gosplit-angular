import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptUploadPageComponent } from './receipt-upload-page.component';

describe('UploadComponent', () => {
  let component: ReceiptUploadPageComponent;
  let fixture: ComponentFixture<ReceiptUploadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptUploadPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
