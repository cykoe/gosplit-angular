import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SortComponent } from '../../components/sort/sort.component';
import { ThumbnailComponent } from '../../components/thumbnail/thumbnail.component';
import { UploadComponent } from '../../components/upload/upload.component';
import { ReceiptListPage } from './receipt-list.page';

describe('LibraryComponent', () => {
  let component: ReceiptListPage;
  let fixture: ComponentFixture<ReceiptListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiptListPage,
        UploadComponent,
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
    fixture = TestBed.createComponent(ReceiptListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
