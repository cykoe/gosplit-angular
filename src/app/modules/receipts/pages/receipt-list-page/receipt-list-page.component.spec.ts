import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SortComponent } from '../../components/sort/sort.component';
import { ThumbnailComponent } from '../../components/thumbnail/thumbnail.component';
import { ReceiptUploadPageComponent } from '../receipt-upload-page/receipt-upload-page.component';
import { ReceiptListPageComponent } from './receipt-list-page.component';

describe('LibraryComponent', () => {
  let component: ReceiptListPageComponent;
  let fixture: ComponentFixture<ReceiptListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiptListPageComponent,
        ReceiptUploadPageComponent,
        SortComponent,
        ThumbnailComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
