import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterPageComponent } from './account-register-page.component';

describe('SignupComponent', () => {
  let component: AccountRegisterPageComponent;
  let fixture: ComponentFixture<AccountRegisterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRegisterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
