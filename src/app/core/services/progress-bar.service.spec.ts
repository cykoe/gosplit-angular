import { TestBed } from '@angular/core/testing';

import { ProgressBarService } from './progress-bar.service';

describe('ProgressBarService', () => {
  let progressBarService: ProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressBarService],
    });

    progressBarService = TestBed.get(ProgressBarService);
  });

  describe('#increase', () => {
    it('should emit indeterminate', () => {
      progressBarService.updateProgressBar$.subscribe(
        (mode) => expect(mode).toEqual('indeterminate'),
        fail,
      );
      progressBarService.increase();
      expect(progressBarService.requestsRunning).toEqual(1);
    });
  });

  describe('#decrease', () => {
    it('should emit indeterminate', () => {
      progressBarService.requestsRunning = 1;
      progressBarService.updateProgressBar$.subscribe(
        (mode) => expect(mode).toEqual('none'),
        fail,
      );
      progressBarService.decrease();
      expect(progressBarService.requestsRunning).toEqual(0);
    });
  });
});
