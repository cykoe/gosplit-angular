import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Directive, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ThumbnailComponent } from './thumbnail.component';
import { Receipt } from '../../../../shared/models/receipt';

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [ThumbnailComponent]
    });
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    const expectedThumbnail = new Receipt();
    expectedThumbnail.id = 'abcd';
    expectedThumbnail.date = new Date();
    expectedThumbnail.store = 'store';
    expectedThumbnail.split = [1, 2, 3];
    component.receipt = expectedThumbnail;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have <p class="item-text-dek"> with "Walmart"', () => {
    const thumbnailDe: DebugElement = fixture.debugElement;
    const paragrahDe = thumbnailDe.query(By.css('.item-text-dek'));
    const p: HTMLElement = paragrahDe.nativeElement;
    fixture.detectChanges();
    expect(p.textContent).toEqual('store');
  });
});

