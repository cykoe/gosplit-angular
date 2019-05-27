import { Component, Input } from '@angular/core';

import { Person, Receipt } from '../../shared/receipt.model';

@Component({
  selector: 'app-receipt-detail-footer',
  templateUrl: './receipt-detail-footer.component.html',
  styleUrls: ['./receipt-detail-footer.component.scss'],
})
export class ReceiptDetailFooterComponent {
  @Input() receipt: Receipt;

  toggleDP(person: Person) {
    if (!person.isPassenger && !person.isDriver) {
      person.isPassenger = true;
    } else if (person.isPassenger && !person.isDriver) {
      person.isDriver = true;
      person.isPassenger = false;
    } else if (!person.isPassenger && person.isDriver) {
      person.isDriver = false;
    }
  }
}
