import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../configs/app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string;
  subtitle: string;

  constructor() { }

  ngOnInit() {
    this.title = AppConfig.title;
    this.subtitle = AppConfig.subtitle;
  }

}
