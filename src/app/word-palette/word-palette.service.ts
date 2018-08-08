import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WordPaletteService {

  private changeWordSource = new Subject<boolean>();
  private changeWordsSource = new Subject<boolean>();
  private checkWordsSource = new Subject<boolean>();
  private checkWordSource = new Subject<boolean>();

  changeWord$ = this.changeWordSource.asObservable();
  changeWords$ = this.changeWordsSource.asObservable();
  checkWords$ = this.checkWordsSource.asObservable();
  checkWord$ = this.checkWordSource.asObservable();

  changeWord(change: boolean) {
    this.changeWordSource.next(change);
  }

  changeWords(change: boolean) {
    this.changeWordsSource.next(change);
  }

  checkWords(check: boolean) {
    this.checkWordsSource.next(check);
  }

  checkWord(check: boolean) {
    this.checkWordSource.next(check);
  }
}
