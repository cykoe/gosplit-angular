import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  updateProgressBar$: EventEmitter<any>;
  requestsRunning = 0;

  constructor() {
    this.updateProgressBar$ = new EventEmitter();
  }

  increase(): void {
    this.requestsRunning++;
    if (this.requestsRunning === 1) {
      this.updateProgressBar$.emit('indeterminate');
    }
  }

  decrease(): void {
    if (this.requestsRunning > 0) {
      this.requestsRunning--;
      if (this.requestsRunning === 0) {
        this.updateProgressBar$.emit('none');
      }
    }
  }
}
