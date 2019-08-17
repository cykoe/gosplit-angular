import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { getReceipts } from '../state';
// import { ReceiptState } from '../state/receipt.reducer';
import { InvoiceService } from '../invoice.service';

@Injectable()
export class ReceiptListResolverService implements Resolve<Observable<string>> {

  constructor(
    private receiptService: InvoiceService,
    private router: Router,
    // private store: Store<ReceiptState>,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // TODO:
    return of('tem[');
    // return this.store.select(getReceipts);
    // return this.receiptService
    //   .list(route.paramMap.get('groupId'))
    //   .pipe(
    //     catchError(() => this.router.navigateByUrl('/')),
    //   );
  }
}
