import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../../shared/shared.module';

import { asyncData } from '../../../../../testing';
import { testPeople } from '../../../receipts/shared/data';
import { Person } from '../../../receipts/shared/person.model';
import { AccountService } from '../../shared/account.service';
import { AccountSettingPageComponent } from './account-setting-page.component';

describe('AccountSettingPageComponent', () => {
  let component: AccountSettingPageComponent;
  let fixture: ComponentFixture<AccountSettingPageComponent>;

  const accountServiceSpy = jasmine.createSpyObj('AccountService', ['list', 'update']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountSettingPageComponent,
      ],
      imports: [
        SharedModule,
      ],
      providers: [
        {provide: AccountService, useValue: accountServiceSpy},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingPageComponent);
    component = fixture.componentInstance;
    const people = testPeople.map((person) => new Person(person));
    accountServiceSpy.list.and.returnValue(asyncData(people));
  });

  describe('after get people', () => {
    beforeEach(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    });

    it('should HAVE all people', () => {
      expect(component.form.get('names')).toBeDefined();
    });
  });
});
