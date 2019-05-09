import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services';

@Component({
  selector: 'app-dashboard-setting-page',
  templateUrl: './dashboard-setting-page.component.html',
  styleUrls: ['./dashboard-setting-page.component.scss'],
})
export class DashboardSettingPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      groups: this.fb.array([]),
    });
    this.auth.readFriends().subscribe((res) => {
      res.forEach((list: any, index) => {
        this.addGroup();
        this.groups.at(index).get('name').setValue(list.name);
        const fm = this.groups.at(index).get('people') as FormArray;
        list.people.forEach((name) => {
          fm.push(this.fb.control(name));
        });
      });
    });
    console.log(this.form.value);
  }

  get groups() {
    return this.form.get('groups') as FormArray;
  }

  addGroup() {
    this.groups.push(this.fb.group({
      people: this.fb.array([]),
      name: '',
    }));
  }

  addName(array) {
    (array as FormArray).push(this.fb.control(''));
  }

  save() {
    this.auth.saveFriends(this.form.value).subscribe((res) => {
      console.log(res);
    });
  }
}
