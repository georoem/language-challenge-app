import { Challenge } from './../challenge.model';
import { Component, OnInit, Input } from '@angular/core';
import { WordPaletteService } from './word-palette.service';
import { WordTypeChallenge } from '../challenge.model';
import { ChallengeService } from '../challenge.service';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-word-palette',
  templateUrl: './word-palette.component.html',
  styleUrls: ['./word-palette.component.css']
})
export class WordPaletteComponent implements OnInit {

  wordTypes: WordTypeChallenge[];
  @Input() level: string;
  @Input() challengeId: string;
  challengeType;
  constructor(private wordPaletteService: WordPaletteService, private challengeService: ChallengeService) {
    wordPaletteService.changeWords$.subscribe(
      change => {
        this.changeWords();
    });
    wordPaletteService.checkWords$.subscribe(
      check => {
        this.checkWords();
    });
  }

  ngOnInit() {
    this.challengeService.getChallengeForId(this.challengeId).subscribe(result => {
      const challenge = plainToClass(Challenge , result);
      this.challengeType = challenge.type;
      this.wordTypes = plainToClass(WordTypeChallenge, challenge.wordsTypeChallenge);
    });
  }

  changeWords() {
    this.wordPaletteService.changeWord(true);
  }

  checkWords() {
    this.wordPaletteService.checkWord(true);
  }

}
