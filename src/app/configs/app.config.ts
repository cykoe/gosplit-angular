import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

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
  title: 'Split Your Bills',
  subtitle: '@ Walmart, County, FreshIntl... with friends',
  rewards: {
    driver: 10,
    passenger: 5,
  },
  repositoryURL: 'https://github.com/sircharlie/gosplit',
  sbDuration: 3000,
};
