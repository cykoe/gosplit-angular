import { InjectionToken } from '@angular/core';

export const AppConfig: any = {
  routes: {
    receipts: 'receipts',
    accounts: 'accounts',
    register: 'register',
    login: 'login',
    home: '',
    detail: ':mm/:dd/:yy/:store/:id',
    upload: 'upload',
  },
  rewards: {
    driver: 10,
    passenger: 5,
  },
  repositoryURL: 'https://github.com/sircharlie/gosplit',
};
