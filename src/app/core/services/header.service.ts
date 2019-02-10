import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

    private headerTabChange = new Subject<string>();
    headerTabChange$ = this.headerTabChange.asObservable();

    changeTab(name: string) {
      this.headerTabChange.next(name);
    }

}
