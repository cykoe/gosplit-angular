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
  uploadUrl: 'https://eh1fpnsn6i.execute-api.us-east-2.amazonaws.com/dev/receipt/getSignedUrl',
  createReceiptUrl: 'https://eh1fpnsn6i.execute-api.us-east-2.amazonaws.com/dev/receipt/createReceipt',
};
