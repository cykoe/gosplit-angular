import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getReceipts } from '../state';
import { ReceiptState } from '../state/receipt.reducer';
import { ReceiptService } from '../receipt.service';

@Injectable()
export class ReceiptListResolverService implements Resolve<Observable<string>> {

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
    private store: Store<ReceiptState>,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.select(getReceipts);
    // return this.receiptService
    //   .list(route.paramMap.get('groupId'))
    //   .pipe(
    //     catchError(() => this.router.navigateByUrl('/')),
    //   );
  }
}
