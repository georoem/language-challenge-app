import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WordPaletteService {

  private changeWordSource = new Subject<boolean>();
  private changeWordsSource = new Subject<boolean>();

  changeWord$ = this.changeWordSource.asObservable();
  changeWords$ = this.changeWordsSource.asObservable();

  changeWord(change: boolean) {
    this.changeWordSource.next(change);
  }

  changeWords(change: boolean) {
    this.changeWordsSource.next(change);
  }
}
