import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptListContainerComponent } from './receipt-list-container.component';

describe('ReceiptListContainerComponent', () => {
  let component: ReceiptListContainerComponent;
  let fixture: ComponentFixture<ReceiptListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
