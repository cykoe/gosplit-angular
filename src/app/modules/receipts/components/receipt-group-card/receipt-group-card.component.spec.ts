import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptGroupCardComponent } from './receipt-group-card.component';

describe('ReceiptGroupCardComponent', () => {
  let component: ReceiptGroupCardComponent;
  let fixture: ComponentFixture<ReceiptGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptGroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
