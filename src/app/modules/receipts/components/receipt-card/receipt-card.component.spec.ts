import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCardComponent } from './receipt-card.component';

describe('ReceiptCardComponent', () => {
  let component: ReceiptCardComponent;
  let fixture: ComponentFixture<ReceiptCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
