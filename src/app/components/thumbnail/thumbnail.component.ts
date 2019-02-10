import { Component, Input, OnInit } from '@angular/core';

import { Receipt } from '../../shared/models/receipt';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.sass'],
})
export class ThumbnailComponent implements OnInit {

  @Input() receipt: Receipt;
  PEOPLE = ['Charlie', 'Takumi', 'Lawrence', 'Mohan', 'Haowei'];

  constructor() { }

  ngOnInit() {
  }

}
