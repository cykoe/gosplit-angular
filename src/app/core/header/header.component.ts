import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { HeaderService } from '../services/header.service';

const TABS = {
  Home: 0,
  Upload: 1,
  About: 2,
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {

  selectedTab: number;

  constructor(
    private headerService: HeaderService,
  ) { }

  ngOnInit() {
    this.selectedTab = TABS.Home;
  }

  changeTab(tabChangeEvent: MatTabChangeEvent): void {
    this.headerService.changeTab(tabChangeEvent.tab.textLabel);
    this.selectedTab = TABS[tabChangeEvent.tab.textLabel];
  }

}
