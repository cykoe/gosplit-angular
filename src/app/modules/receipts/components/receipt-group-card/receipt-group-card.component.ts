import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '../../shared/group.model';

@Component({
  selector: 'app-receipt-group-card',
  templateUrl: './receipt-group-card.component.html',
  styleUrls: ['./receipt-group-card.component.scss'],
})
export class ReceiptGroupCardComponent implements OnInit {
  form: FormGroup;
  @Input() group: Group;

  constructor(
    private fb: FormBuilder,
  ) { }

  get people() {
    return this.form.get('people') as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.group.name,
      people: this.fb.array(this.group.people),
    });
  }
}
