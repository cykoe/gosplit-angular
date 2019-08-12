import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Receipt } from '../../shared/receipt.model';
import { IReceipt } from '../../state/models';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-list-page.component.html',
  styleUrls: ['./receipt-list-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', visibility: 'visible'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReceiptListPageComponent implements OnInit {
  @Input() receipts$: Observable<IReceipt[]>;
  @Output() deleted = new EventEmitter<IReceipt>();
  @Output() selected = new EventEmitter<IReceipt>();

  displayedColumns: string[];
  footer: number[];
  dataSource$: Observable<MatTableDataSource<IReceipt>>;
  selection = new SelectionModel<IReceipt>(true, []);
  expandedElement;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.dataSource$ = this.receipts$.pipe(
      map((receipts: IReceipt[]) => {
        const sortedReceipts = receipts.sort((val1, val2) => +new Date(val2.date) - +new Date(val1.date));
        const defaultCols = ['Select', 'Date'];
        receipts.length
          ? this.displayedColumns = [...defaultCols, ...sortedReceipts[0].people.map((p) => p.name)]
          : this.displayedColumns = [...defaultCols];
        this.footer = new Array(this.displayedColumns.length - defaultCols.length).fill(0);
        return new MatTableDataSource<IReceipt>(sortedReceipts);
      }),
    );
  }

  /**
   * Get the price for each person on current row
   * @param receipt
   * @param name
   */
  private getPriceByName(receipt: IReceipt, name: string): number {
    const foundPerson = receipt.people.find((p) => p.name === name);
    return foundPerson ? foundPerson.price : 0;
  }

  receiptSelected(receipt: IReceipt): void {
    // this.router.navigate([`receipts/groups/groupId/${receipt.toUrlDate()}/${receipt.store}/${receipt.id}`]);
    this.selected.emit(receipt);
  }

  receiptDeleted(receipt: IReceipt) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: receipt,
    });
    dialogRef.afterClosed()
      .subscribe((r: IReceipt) => {
        if (r) {
          this.deleted.emit(receipt);
        }
      });
  }
  /**
   * Whether the number of selected elements matches the total number of rows
   * @param dataSource
   */
  private isAllSelected(dataSource: MatTableDataSource<IReceipt>): boolean {
    return this.selection.selected.length === dataSource.data.length;
  }

  /**
   * Select all rows if they are not all selected; otherwise clear selection
   * and then trigger calculateTotal
   * @param dataSource
   */
  private masterToggle(dataSource: MatTableDataSource<IReceipt>): void {
    this.isAllSelected(dataSource)
      ? this.selection.clear()
      : dataSource.data.forEach((row) => this.selection.select(row));
    this.footer = this.calculateTotal(this.selection.selected, this.displayedColumns.length);
  }

  /**
   * Toggle a row selection, and then trigger calculateTotal
   * @param row
   */
  private rowToggle(row: IReceipt): void {
    this.selection.toggle(row);
    this.footer = this.calculateTotal(this.selection.selected, this.displayedColumns.length);
  }

  /**
   * Calculate total price for each column (person)
   * @param selectedArr
   * @param displayedColLen
   */
  private calculateTotal(selectedArr: any[], displayedColLen: number): number[] {
    return selectedArr
      .map((t) => {
        const newSplit = t.people.map((person) => person.price);
        while (t.people.length < displayedColLen - 2) {
          newSplit.push(0);
        }
        return newSplit;
      })
      .reduce((acc, value) => acc.map((p, i) => p + value[i]), [0, 0, 0, 0, 0]);
  }
}
