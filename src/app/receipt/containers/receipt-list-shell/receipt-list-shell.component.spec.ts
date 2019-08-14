import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptListShellComponent } from './receipt-list-shell.component';

describe('ReceiptListContainerComponent', () => {
  let component: ReceiptListShellComponent;
  let fixture: ComponentFixture<ReceiptListShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptListShellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptListShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
