import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss'],
})
export class TableDialogComponent implements OnInit {
  dataSource;
  displayedColumns;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string[],
  ) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'split'];
    this.dataSource = this.data;
  }
}
