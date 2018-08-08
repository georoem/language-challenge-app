import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class ChronometerService {

  private chronometerIntervalSource = new Subject<number>();
  private chronometerStartSource = new Subject<boolean>();
  private chronometerRestartSource = new Subject<boolean>();
  private chronometerStopSource = new Subject<boolean>();
  private chronometerCallbackSource = new Subject<string>();

  chronometerInterval$ = this.chronometerIntervalSource.asObservable();
  chronometerStart$ = this.chronometerStartSource.asObservable();
  chronometerRestart$ = this.chronometerRestartSource.asObservable();
  chronometerStop$ = this.chronometerStopSource.asObservable();
  chronometerCallback$ = this.chronometerCallbackSource.asObservable();

  chronometerInterval(interval: number) {
    this.chronometerIntervalSource.next(interval);
  }

  chronometerStart(start: boolean) {
    this.chronometerStartSource.next(start);
  }

  chronometerRestart(restart: boolean) {
    this.chronometerRestartSource.next(restart);
  }

  chronometerStop(stop: boolean) {
    this.chronometerStopSource.next(stop);
  }

  chronometerCallback(timestamp: string) {
    this.chronometerCallbackSource.next(timestamp);
  }

}
