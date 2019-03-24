import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptListCardComponent} from './receipt-list-card.component';

describe('ReceiptCardComponent', () => {
  let component: ReceiptListCardComponent;
  let fixture: ComponentFixture<ReceiptListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptListCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
