import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from '../../shared/group.model';

@Component({
  selector: 'app-receipt-group-card',
  templateUrl: './receipt-group-card.component.html',
  styleUrls: ['./receipt-group-card.component.scss'],
})
export class ReceiptGroupCardComponent implements OnInit {
  @Input() group: Group;
  @Output() deleted = new EventEmitter<Group>();

  constructor() {}

  ngOnInit() {
  }

  deleteGroup() {
    this.deleted.emit(this.group);
  }
}
