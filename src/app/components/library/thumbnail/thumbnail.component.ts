import { Component, OnInit, Input } from '@angular/core';

import { Receipt } from '../../../models/receipt';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.sass']
})
export class ThumbnailComponent implements OnInit {

  @Input() receipt: Receipt;

  constructor() { }

  ngOnInit() {
  }

}
