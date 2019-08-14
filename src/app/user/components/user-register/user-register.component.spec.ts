import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { UserService } from '../../../core/services';
import { UserRegisterComponent } from './user-register.component';

import { asyncData, RouterLinkDirectiveStub } from '../../../../testing';
import { User } from '../../../receipt/shared/user';

describe('ReceiptRegisterPageComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authSpy = jasmine.createSpyObj('AuthService', ['register']);
    TestBed.configureTestingModule({
      declarations: [UserRegisterComponent, RouterLinkDirectiveStub],
      providers: [
        FormBuilder,
        {provide: Router, useValue: routerSpy},
        {provide: UserService, useValue: authSpy},
      ],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should submit register credentials to authService', async(() => {
    const expectedUser: User = {username: '', token: '', url: ''};
    authServiceSpy.register.and.returnValue(asyncData(expectedUser));

    const formDe: DebugElement = fixture.debugElement.query(By.css('.register-form'));
    formDe.triggerEventHandler('ngSubmit', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      // args passed to router.navigate spy
      const router = fixture.debugElement.injector.get(Router);
      const spy = router.navigate as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];
      expect(navArgs[0]).toEqual(expectedUser.url);
    });
  }));
});
