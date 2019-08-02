import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../core/services';
import { Group } from '../../shared/group.model';
import { Person, Receipt } from '../../shared/receipt.model';
import { ReceiptService } from '../../shared/receipt.service';

@Component({
  selector: 'app-upload',
  templateUrl: './receipt-upload-page.component.html',
  styleUrls: ['./receipt-upload-page.component.scss'],
})
export class ReceiptUploadPageComponent implements OnInit {
  form: FormGroup;
  loading = false;
  groups: Group[];

  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private receiptService: ReceiptService,
    private router: Router,
    private auth: AuthService,
  ) {
  }

  get group() {
    return this.form.get('group');
  }

  get payer() {
    return this.form.get('payer');
  }

  get store() {
    return this.form.get('store');
  }

  ngOnInit(): void {
    this.receiptService.listGroups().subscribe((list: Group[]) => {
      this.groups = list;
    });
    this.form = this.fb.group({
      receipt: ['', [Validators.required]],
      // payer: ['', [Validators.required]],
      // store: ['', [Validators.required]],
      // group: ['', [Validators.required]],
      payer: ['', []],
      store: ['', []],
      group: ['', []],
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('receipt').setValue(file);
    }
  }

  onSubmit() {
    this.receiptService.getUploadUrl().subscribe((res) => {
      console.log(res);
      // this.receiptService.upload(res.uploadURL, this.form.get('receipt').value).subscribe((hi) => {
      //   console.log(hi);
      // });
      // this.receiptService.createReceiptNew(this.form);
      console.log(this.form.value);
      // this.receiptService.createReceiptNew()
    });
    // const formModel = this.prepareSave();
    // this.loading = true;
    // this.receiptService.create(formModel)
    //   .pipe(
    //     switchMap((receipt: Receipt) => {
    //       receipt.people = this.group.value.people.map((name) => {
    //         const person: Person = {
    //           name,
    //           price: 0,
    //           isDriver: false,
    //           isPassenger: false,
    //           itemSelection: new Array(receipt.list.length).fill(false),
    //         };
    //         return person;
    //       });
    //       // receipt.list.forEach((item) => item.people = this.group.value.people.map((name) => new Person({name})));
    //       return this.receiptService.update(receipt);
    //     }),
    //   )
    //   .subscribe((res) => {
    //     this.router.navigateByUrl('/receipts/groups');
    //     this.loading = false;
    //   }, (err) => {
    //     this.loading = false;
    //   });
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('receipt', this.form.get('receipt').value);
    input.append('payer', this.form.get('payer').value);
    input.append('store', this.form.get('store').value);
    input.append('groupId', this.form.get('group').value.id);
    return input;
  }
}
