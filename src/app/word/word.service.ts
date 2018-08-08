import { Injectable } from '@angular/core';
import { Word } from './word.model';
import { Subject } from 'rxjs/Subject';
import { BlockUIService } from 'ng-block-ui/dist/lib/services/block-ui.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {plainToClass} from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WordService {

  @BlockUI() appBlockUI: NgBlockUI;

  words={};
  pronouns: Word[];
  verbs: Word[];
  nouns: Word[];
  verbTimes: Word[];
  newWords: Word[];
  urlService = '';

  constructor(private http: HttpClient, private blockUIService: BlockUIService) {
      this.urlService = environment.apiUrl;

      this.appBlockUI.start('Cargando..');
      this.http.get<Word[]>(this.urlService + 'words/wordType/pronoun').subscribe(data => {
          this.words['pronoun'] = plainToClass(Word , data);
          this.appBlockUI.stop();
      });

      this.appBlockUI.start('Cargando..');
      this.http.get<Word[]>(this.urlService + 'words/wordType/verb').subscribe(data => {
        this.words['verb']  = plainToClass(Word , data);
          this.appBlockUI.stop();
      });

      this.appBlockUI.start('Cargando..');
      this.http.get<Word[]>(this.urlService + 'words/wordType/noun').subscribe(data => {
          this.words['noun'] = plainToClass(Word , data);
          this.appBlockUI.stop();
      });

      this.appBlockUI.start('Cargando..');
      this.http.get<Word[]>(this.urlService + 'words/wordType/verbTime').subscribe(data => {
          this.words['verbTime'] = plainToClass(Word , data);
          this.appBlockUI.stop();
      });

      this.appBlockUI.start('Cargando..');
      this.http.get<Word[]>(this.urlService + 'words/wordType/newWord').subscribe(data => {
          this.words['newWord'] = plainToClass(Word , data);
          this.appBlockUI.stop();
      });

  }

  private checkWordCallbackSource = new Subject<boolean>();

  checkWordCallback$ = this.checkWordCallbackSource.asObservable();

  checkwordCallback(check: boolean) {
    this.checkWordCallbackSource.next(check);
  }

  getRandomWord(type: string, level: string): Word {
    let words = this.getWords(type, level);
    return words[Math.floor(Math.random() * words.length)];
  }

  public getWords(type, level) {
    if (level) {
        const list = this.getWordsFilterByParam(this.words[type], 'level', level);
        return list;
    } else {
        return this.words[type];
    }
  }

  private getWordsFilterByParam(list, paramName, paramValue: string) {
      const returnList = [];
      if (list) {
          list.forEach(element => {
              if (element[paramName] === 'all' || element[paramName].indexOf(paramValue.toLowerCase()) !== -1) {
                  returnList.push(element);
              }
          });
      }
      return returnList;
  }

}
