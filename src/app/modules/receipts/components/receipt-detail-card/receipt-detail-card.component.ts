import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Observable, forkJoin } from 'rxjs';

import { DeleteConfirmDialogComponent } from '../../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Item } from '../../shared/item.model';

@Component({
  selector: 'app-receipt-detail-card',
  templateUrl: './receipt-detail-card.component.html',
  styleUrls: ['./receipt-detail-card.component.scss'],
})
export class ReceiptDetailCardComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  isSelectAll = false;

  @Input() itemId: Observable<string>;
  @Input() keyCode: Observable<string>;
  @Input() item: Item;
  @Output() removed = new EventEmitter<Item>();
  @Output() changed = new EventEmitter<Item>();
  @Output() selected = new EventEmitter<string>();

  @ViewChild('card') set cardContent(card: ElementRef<HTMLElement>) {
    if (card) {
      this.focusMonitor.monitor(card).subscribe((origin: FocusOrigin) => this.ngZone.run(() => {
        this.cdr.markForCheck();
      }));
    }
  }

  item_cp: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.item.name],
      price: [this.item.price],
      image: [this.item.image],
    });
    forkJoin(this.keyCode, this.itemId).subscribe(val=>{
      console.log(val);
      if (this.item.id === val[1]) {
        const person = this.item.people.find((p) => p.name.toLowerCase().startsWith(val[0].toLowerCase()));
        console.log(person);
      if (person) {
          person.selection = !person.selection;
          this.updatePrice();
        }
      }
    })
  }

  remove(item: Item) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '250px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result.id && result.id === item.id) {
        this.removed.emit(item);
      }
    });
  }

  change(item: Item) {
    this.changed.emit(item);
  }

  update() {
    this.item_cp = {...this.item};
    if (this.isEdit) {
      this.item.name = this.form.get('name').value;
      this.item.price = this.form.get('price').value;
      this.item.image = this.form.get('image').value;
      this.updatePrice();
    }
    this.isEdit = !this.isEdit;
  }

  undo() {
    this.item.name = this.item_cp.name;
    this.item.price = this.item_cp.price;
    this.item.image = this.item_cp.image;
    this.form.get('name').setValue(this.item.name);
    this.form.get('price').setValue(this.item.price);
    this.form.get('image').setValue(this.item.image);
    this.isEdit = !this.isEdit;
  }

  focus() {
    this.selected.emit(this.item.id);
  }

  toggle() {
    this.updatePrice();
  }

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    this.item.people.forEach((person) => person.selection = true);
    this.updatePrice();
  }

  deselectAll() {
    this.isSelectAll = !this.isSelectAll;
    this.item.people.forEach((person) => person.selection = false);
    this.updatePrice();
  }

  updatePrice() {
    const count = this.item.people.filter((p) => !!p.selection).length;
    const split = this.item.price / count;
    this.item.people.forEach((person) => person.price = person.selection ? split : 0);
    this.change(this.item);
  }

  // @HostListener('window:keydown', ['$event']) keyFunc(event) {
  // if (this.item.id !== this.currentItemId) { return; }
  // const person = this.item.people.find((p) => p.name.toLowerCase().startsWith(event.key.toLowerCase()));
  // if (person) {
  //   person.selection = !person.selection;
  //   this.updatePrice();
  // }
  // }
}
