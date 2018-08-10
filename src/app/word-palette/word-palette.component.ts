import { Subscription } from 'rxjs/Subscription';
import { WordService } from './../word/word.service';
import { WordTypeChallenge } from './../challenge/challenge.model';
import { Challenge } from './../challenge/challenge.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WordPaletteService } from './word-palette.service';
import { ChallengeService } from './../challenge/challenge.service';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-word-palette',
  templateUrl: './word-palette.component.html',
  styleUrls: ['./word-palette.component.css']
})
export class WordPaletteComponent implements OnInit, OnDestroy  {

  @Input('level') level: string;

  @Input('challengeId') challengeId: string;
  
  challengeType;

  private subscription: Subscription = new Subscription();

  wordTypes: WordTypeChallenge[];

  constructor(private wordPaletteService: WordPaletteService, private challengeService: ChallengeService, private wordService: WordService) {
    this.subscription.add(wordPaletteService.changeWords$.subscribe(
      change => {
        this.changeWords();
    }));
    this.subscription.add(wordPaletteService.checkWords$.subscribe(
      check => {
        this.checkWords();
    }));
  }

  ngOnInit() {
    this.challengeService.getChallengeForId(this.challengeId).subscribe(result => {
      const challenge = plainToClass(Challenge, result);
      this.challengeType = challenge.type;
      this.wordTypes = plainToClass(WordTypeChallenge, challenge.wordsTypeChallenge);
      this.wordService.initWordTypes(this.wordTypes);
    });
  }

  changeWords() {
    this.wordPaletteService.changeWord(true);
  }

  checkWords() {
    this.wordPaletteService.checkWord(true);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}