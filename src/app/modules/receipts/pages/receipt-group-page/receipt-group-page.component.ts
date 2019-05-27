import { Component, OnInit } from '@angular/core';

import { Group } from '../../shared/group.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-receipt-group-page',
  templateUrl: './receipt-group-page.component.html',
  styleUrls: ['./receipt-group-page.component.scss'],
})
export class ReceiptGroupPageComponent implements OnInit {
  groups: Group[];

  constructor(
    private receiptService: ReceiptService,
  ) { }

  ngOnInit() {
    this.receiptService.listGroups().subscribe((groups: Group[]) => {
      this.groups = groups;
    });
  }

  addGroup(group) {
    this.receiptService.createGroup(group)
      .subscribe((g: Group) => {
        this.groups.push(g);
      });
  }

  deleteGroup(group) {
    this.receiptService.deleteGroup(group)
      .subscribe((res) => {
        if (res.deletedCount === 1) {
          this.groups = this.groups.filter((g) => g.id !== group.id);
        }
      });
  }
}
