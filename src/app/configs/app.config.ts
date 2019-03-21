import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    receipts: 'receipts',
    accounts: 'accounts',
    register: 'register',
    login: 'login',
    home: '',
    detail: ':year/:month/:day/:store/:id',
    upload: 'upload',
  },
  repositoryURL: 'https://github.com/sircharlie/gosplit',
  sbDuration: 3000,
};
