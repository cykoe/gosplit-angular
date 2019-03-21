import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { HeaderService } from '../../../core/services/header.service';

const TABS = {
  Home: 0,
  Upload: 1,
  About: 2,
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  selectedTab: number;

  constructor(
    private headerService: HeaderService,
    private _location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.selectedTab = TABS.Home;
  }

  changeTab(tabChangeEvent: MatTabChangeEvent): void {
    this.headerService.changeTab(tabChangeEvent.tab.textLabel);
    this.selectedTab = TABS[tabChangeEvent.tab.textLabel];
  }

  returnClicked() {
    this._location.back();
  }

  cancelClicked() {
    this.router.navigate([`/`]);
  }

}
