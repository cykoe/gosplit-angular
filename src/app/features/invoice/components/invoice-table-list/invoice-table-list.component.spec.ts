import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../../shared/modules/material.module';
import { InvoiceTableListComponent } from './invoice-table-list.component';

describe('LibraryComponent', () => {
  let component: InvoiceTableListComponent;
  let fixture: ComponentFixture<InvoiceTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvoiceTableListComponent,
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
    fixture = TestBed.createComponent(InvoiceTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
