import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { ReceiptListPageComponent } from './receipt-list-page.component';

describe('LibraryComponent', () => {
  let component: ReceiptListPageComponent;
  let fixture: ComponentFixture<ReceiptListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiptListPageComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
