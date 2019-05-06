import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ReceiptService } from './receipt.service';

@Injectable()
export class ReceiptListResolverService implements Resolve<Observable<string>> {

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.receiptService
      .list()
      .pipe(
        catchError(() => this.router.navigateByUrl('/')),
      );
  }
}
