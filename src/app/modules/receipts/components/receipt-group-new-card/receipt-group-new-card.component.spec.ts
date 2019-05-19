import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../../shared/shared.module';
import { ReceiptGroupNewCardComponent } from './receipt-group-new-card.component';

describe('ReceiptGroupNewCardComponent', () => {
  let component: ReceiptGroupNewCardComponent;
  let fixture: ComponentFixture<ReceiptGroupNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [ ReceiptGroupNewCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptGroupNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
