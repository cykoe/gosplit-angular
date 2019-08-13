import { FocusMonitor, FocusTrapFactory, ListKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import * as fromReceipt from '../../state';
import * as receiptActions from '../../state/receipt.actions';

import { select, Store } from '@ngrx/store';

import { ReceiptService } from '../../receipt.service';
import { IItem, IPerson, IReceipt } from '../../state/models';

@Component({
  selector: 'app-receipt-detail',
  templateUrl: './item-list-shell.component.html',
  styleUrls: ['./item-list-shell.component.scss'],
})
export class ItemListShellComponent implements OnInit {
  selectedReceipt$: Observable<IReceipt>;

  keyManager: any;
  key$ = new BehaviorSubject<string>('');
  key = this.key$.asObservable();
  activeItemId = 0;

  @ViewChildren('card') card: QueryList<any>;
  @ViewChild('cardDisplay', {static: false}) cardDisplay: ElementRef<HTMLElement>;

  constructor(
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private sb: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<fromReceipt.State>,
  ) {
  }

  ngOnInit(): void {
    this.selectedReceipt$ = this.store.pipe(select(fromReceipt.getCurrentReceipt));
  }

  newItem($event: {item: IItem, receiptId: string}): void {
    const {item, receiptId} = $event;
    this.store.dispatch(receiptActions.createItem({item, receiptId}));
  }

  updateItem($event: {item: IItem, receiptId: string}): void {
    const {item, receiptId} = $event;
    this.store.dispatch(receiptActions.updateItem({item, receiptId}));
  }

  deleteItem($event: {item: IItem, receiptId: string}): void {
    const {item, receiptId} = $event;
    this.store.dispatch(receiptActions.deleteItem({item, receiptId}));
  }

  toggleItem($event: {person: IPerson, item: IItem, index: number, receiptId: string}) {
    const {person, item, index, receiptId} = $event;
    this.store.dispatch(receiptActions.toggleSelection({person, item, index, receiptId}));
    // this.receipt.toggleSelection($event.person, $event.item, $event.index);
  }

  toggleAllItems($event: {selection: boolean, item: IItem, index: number, receiptId: string}) {
    const {selection, item, index, receiptId} = $event;
    this.store.dispatch(receiptActions.toggleAllSelection({selection, item, index, receiptId}));
  }

  // autoSelect() {
    // this.receiptService.autoSelect(this.receipt)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  // }
  // createReceipt(): void {
  //   const dialogRef = this.dialog.open(CreateFormDialogComponent, {
  //     width: '250px',
  //     data: Item.getPropertyNames(),
  //   });
  //
  //   dialogRef.afterClosed()
  //     .subscribe((result) => {
  //       if (result) {
  //         const newItem = {...result, id: uuid()};
  //         this.store.dispatch(receiptActions.createItem({item: newItem, receiptId}))
  //         this.receipt.createItem({...result, id: uuid()});
  //       }
  //     });
  // }
  //
  // /**
  //  * updateItem receipt to the backend
  //  */
  // updateReceipt() {
  //   this.receiptService.update({} as IReceipt)
  //     .subscribe(() => {
  //       this.sb.open('Saved!', 'OK');
  //     });
  // }
}
