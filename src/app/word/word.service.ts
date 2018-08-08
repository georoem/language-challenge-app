import { Injectable } from '@angular/core';
import { Word } from './word.model';
import { JsonService } from './../util/json.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WordService {

  constructor(private jsonService: JsonService) {}

  private checkWordCallbackSource = new Subject<boolean>();

  checkWordCallback$ = this.checkWordCallbackSource.asObservable();

  getRandomWord(type: string, level: string): Word {

    switch (type) {
      case 'PRONOUN':
        return this.jsonService.getPronouns(level)[Math.floor(Math.random() * this.jsonService.getPronouns(level).length)];
      case 'VERB':
        return this.jsonService.getVerbs(level)[Math.floor(Math.random() * this.jsonService.getVerbs(level).length)];
      case 'NOUN':
        return this.jsonService.getNouns(level)[Math.floor(Math.random() * this.jsonService.getNouns(level).length)];
      case 'TIME':
        return this.jsonService.getVerbTimes(level)[Math.floor(Math.random() * this.jsonService.getVerbTimes(level).length)];
      case 'NEW':
        return this.jsonService.getNewWords(level)[Math.floor(Math.random() * this.jsonService.getNewWords(level).length)];
      default:
        break;
    }
  }

  checkwordCallback(check: boolean) {
    this.checkWordCallbackSource.next(check);
  }

}
