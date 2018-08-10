import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Observable } from 'rxjs/Observable';
import { ChronometerService } from './chronometer.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit, OnDestroy {

  chrono;
  timestamp;
  totalTime;
  interval = null;
  private subscription: Subscription = new Subscription();

  constructor(private chronometerService: ChronometerService) {

    this.subscription.add(chronometerService.chronometerStop$.subscribe(
      reset => {
        this.stopTimer();
      }));

      this.subscription.add(chronometerService.chronometerRestart$.subscribe(
      reset => {
        this.restartTimer();
      }));

      this.subscription.add(chronometerService.chronometerStart$.subscribe(
      start => {
        this.startTimer();
      }));
   }

  ngOnInit() {
  }

  startTimer() {
    const startTime = Date.now();
    this.interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      this.timestamp = (elapsedTime );
      this.chrono = moment(0).hour(0).minute(0).second(0).millisecond(this.timestamp).format(' mm : ss ');
     } , 10);
  }

  restartTimer() {
    this.unsubscribeTimer();
    this.startTimer();
    this.chronometerService.chronometerCallback(this.timestamp);
  }

  stopTimer() {
    this.unsubscribeTimer();
    this.chronometerService.chronometerCallback(this.timestamp);
    this.chrono = null;
  }

  unsubscribeTimer() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
