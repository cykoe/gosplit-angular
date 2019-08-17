import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IGroup } from '../../../../constants/models';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  @Input() group: IGroup;
  @Output() selectCard = new EventEmitter<IGroup>();
  @Output() update = new EventEmitter<IGroup>();
  @Output() delete = new EventEmitter<IGroup>();

  constructor() {
  }

  ngOnInit(): void {
  }

  updateGroup() {
    this.update.emit(this.group);
  }

  deleteGroup() {
    this.delete.emit(this.group);
  }

  selectGroup() {
    this.selectCard.emit(this.group);
  }
}
