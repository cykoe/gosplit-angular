import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNewCardComponent } from './item-new-card.component';

describe('ItemNewCardComponent', () => {
  let component: ItemNewCardComponent;
  let fixture: ComponentFixture<ItemNewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemNewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
