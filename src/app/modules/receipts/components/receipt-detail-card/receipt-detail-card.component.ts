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
import { combineLatest, Observable } from 'rxjs';

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

  @Input() isSelected: boolean;
  @Input() key: Observable<string>;
  @Input() item: Item;
  @Output() removed = new EventEmitter<Item>();
  @Output() changed = new EventEmitter<Item>();
  @Output() selected = new EventEmitter<Item>();

  @ViewChild('card') card: ElementRef<HTMLElement>;

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
    this.key.subscribe((key) => {
      if (this.isSelected && key) {
        const person = this.item.people[Number(key) - 1];
        if (person) {
          person.selection = !person.selection;
          this.updatePrice();
        }
        if (key  === 'a') {
          (this.isSelectAll) ? this.deselectAll() : this.selectAll();
        }
      }
    });
  }

  // ngAfterViewInit() {
  //   this.focusMonitor.monitor(this.card).subscribe(() => this.ngZone.run(() => {
  //     this.cdr.markForCheck();
  //   }));
  // }

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
    this.selected.emit(this.item);
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
}
