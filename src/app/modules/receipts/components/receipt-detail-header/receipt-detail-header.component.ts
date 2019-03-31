import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, Input, OnInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, throttleTime } from 'rxjs/operators';
import { AppConfig } from '../../../../configs/app.config';
import { Person } from '../../shared/person.model';
import { Receipt } from '../../shared/receipt.model';

@Component({
  selector: 'app-receipt-detail-header',
  templateUrl: './receipt-detail-header.component.html',
  styleUrls: ['./receipt-detail-header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        'hidden',
        style({ opacity: 0, transform: 'translateY(-100%)' }),
      ),
      state(
        'visible',
        style({ opacity: 1, transform: 'translateY(0)' }),
      ),
      transition('* => *', animate('200ms ease-in')),
    ]),
  ],
})
export class ReceiptDetailHeaderComponent implements AfterViewInit {
  private isVisible = true;

  @HostBinding('@toggle')
  get toggle(): string {
    return this.isVisible ? 'visible' : 'hidden';
  }

  @Input() receipt: Receipt;

  ngAfterViewInit() {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): string => (y2 < y1 ? 'Up' : 'Down')),
      distinctUntilChanged(),
      share(),
    );

    const goingUp$ = scroll$.pipe(
      filter((direction) => direction === 'Up'),
    );

    const goingDown$ = scroll$.pipe(
      filter((direction) => direction === 'Down'),
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }

  toggleDP(person: Person) {
    if (!person.isPassenger && !person.isDriver) {
      person.isPassenger = true;
    } else if (person.isPassenger && !person.isDriver) {
      person.isDriver = true;
      person.isPassenger = false;
    } else if (!person.isPassenger && person.isDriver) {
      person.isDriver = false;
    }
    this.receipt.updateSplit(AppConfig.rewards);
  }

}
