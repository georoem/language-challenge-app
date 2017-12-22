import { Word } from './word.model';
import { WordService } from './word.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { WordPaletteService } from '../word-palette.service';
import { Howl } from 'howler';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {

  @Input() word: any;

  @Input() level: string;

  @Input() challengeType: string;

  selectedWord = new Word('', '', '');

  digitWord;

  sound: Howl;

  onWord;

  TOLERANCE = 2;

  validAnswer;

  constructor(private wordService: WordService, private wordPaletteService: WordPaletteService) {
    wordPaletteService.changeWord$.subscribe(
      change => {
        this.changeWord();
      });
  }

  ngOnInit() {
  }

  changeWord() {
     const randomWord = this.wordService.getRandomWord(this.word.type, this.level);
     if (randomWord) {
       this.selectedWord = randomWord;
     }
     this.digitWord = '';
     this.validAnswer = true;
  }

  playWordSound(word) {
    this.sound = new Howl({
      src: ['http://howjsay.com/mp3/' + word + '.mp3'],
      html5 : true
    });

    this.sound.play();
  }

  validateWord() {
    let differences = 0;
    let isValid = true;
    for (let i = 0, len = this.digitWord.length; i < len; i++) {
      if (this.digitWord.charAt(i) !== this.selectedWord.wordTranslate.charAt(i)) {
        differences++;
        if (differences > this.TOLERANCE) {
          isValid = false;
          return;
        }
      }
    }
    this.validAnswer = isValid;
    return isValid;
  }

}
