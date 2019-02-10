import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.sass'],
})
export class LoadingBarComponent implements OnInit {

  @Input() isLoadingResults: boolean;
  @Input() isUploadingErrors: string;

  constructor() { }

  ngOnInit() {
  }

}
