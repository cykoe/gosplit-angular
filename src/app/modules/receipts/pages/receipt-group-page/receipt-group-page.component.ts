import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { Group } from '../../shared/group.model';

@Component({
  selector: 'app-receipt-group-page',
  templateUrl: './receipt-group-page.component.html',
  styleUrls: ['./receipt-group-page.component.scss'],
})
export class ReceiptGroupPageComponent implements OnInit {
  groups: Group[];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.listGroups().subscribe((groups: Group[]) => {
      console.log(groups);
      this.groups = groups;
    });
  }

  addGroup() {
    this.authService.saveFriends({name: 'sample', people: []})
      .subscribe((res) => {
        console.log(res);
      });
  }

  saveGroup(group) {
    this.authService.updateFriends({groupId: group.id, ...group})
      .subscribe((res) => {
        console.log(res);
      });
  }
}
