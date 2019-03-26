import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../receipts/shared/person.model';
import { AccountService } from '../../shared/account.service';

@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.scss'],
})
export class AccountSettingPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.list().subscribe((people: Person[]) => {
      people.forEach((person) => {
        (this.form.get('names') as FormArray).push(this.fb.control(person.name));
      });
    });
    this.form = this.fb.group({
      names: this.fb.array([]),
    });
  }

  update() {
    const newPeople = this.form.get('names').value.map((p) => {
      return new Person({name: p});
    });
    this.accountService.update(newPeople).subscribe((people: Person[]) => {
      people.forEach((person) => {
        (this.form.get('names') as FormArray).push(this.fb.control(person.name));
      });
    });
  }
}
