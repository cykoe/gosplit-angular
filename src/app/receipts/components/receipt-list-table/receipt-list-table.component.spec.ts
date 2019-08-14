import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ReceiptListTableComponent } from './receipt-list-table.component';

describe('LibraryComponent', () => {
  let component: ReceiptListTableComponent;
  let fixture: ComponentFixture<ReceiptListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiptListTableComponent,
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
    fixture = TestBed.createComponent(ReceiptListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
