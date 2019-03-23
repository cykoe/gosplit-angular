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
  peopleList: [
    {
      name: 'Charlie',
    },
    {
      name: 'Xinghan',
    },
    {
      name: 'Lawrence',
    },
    {
      name: 'Mohan',
    },
    {
      name: 'Haowei',
    },
  ],
  repositoryURL: 'https://github.com/sircharlie/gosplit',
  sbDuration: 3000,
};
