import { ScoreDialogComponent } from './score.dialog';
import { ChallengeResult } from './challenge-result.model';
import { ChronometerService } from './chronometer/chronometer.service';
import { Component, OnInit } from '@angular/core';
import { WordPaletteService } from './word-palette/word-palette.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import * as moment from 'moment';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SaveScoreDialogComponent } from './save-score.dialog';
import { ScoreService } from '../util/score.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  level = 'A1';
  optionLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  selectedOrderWords: string[];
  challengeTypes = [
    {
      type: 'SENTENCE',
      orderWords: [{
          type: 'TIME',
          typeTitle: 'Verb Time',
          color: '#039BE5',
          icon: 'hourglass_empty'
        },
        {
          type: 'PRONOUN',
          typeTitle: 'Pronoun',
          color: '#8D6E63',
          icon: 'face'
         },
         {
           type: 'VERB',
           typeTitle: 'Verb',
           color: '#F4511E',
           icon: 'gavel'
         },
         {
           type: 'NOUN',
           typeTitle: 'Noun',
           color: '#43A047',
           icon: 'nature_people'
         }]
    },
    {
      type: 'QUESTION',
      orderWords: [{
        type: 'TIME',
        typeTitle: 'Verb Time',
        color: '#039BE5',
        icon: 'hourglass_empty'
      },
      {
        type: 'AUXILIARY',
        typeTitle: 'Auxiliary',
        color: '#757575',
        icon: 'directions_walk'
       },
       {
         type: 'VERB',
         typeTitle: 'Verb',
         color: '#F4511E',
         icon: 'gavel'
       },
       {
         type: 'NOUN',
         typeTitle: 'Noun',
         color: '#43A047',
         icon: 'nature_people'
       },
       {
        type: 'QUESTION_TYPE',
        typeTitle: 'Question Type',
        color: '#E53935',
        icon: 'directions_walk'
      }]
    }
  ];
  user = '';
  score = 0;
  scoreFormatted = '';
  challengeState= CHALLENGE_STATE.UNSTARTED;
  CHALLENGE_STATE = CHALLENGE_STATE;
  actualStep: number;
  stepResults = [];
  stepNumber = 10;
  challengeResult: ChallengeResult;
  challengeResults = [];
  scoreDialogRef = null;
  saveScoreDialogRef = null;

  constructor(public dialog: MatDialog, private chronometerService: ChronometerService,
    private wordPaletteService: WordPaletteService, private modalService: NgbModal, private scoreService: ScoreService) {
    chronometerService.chronometerCallback$.subscribe(
      timestamp => {
        this.score += +timestamp;
        this.scoreFormatted = this.score / 1000 + ' Seconds';
        this.saveStepResult({step: this.actualStep, stepTime: timestamp});
      });
  }

  ngOnInit() {
    this.selectedOrderWords = this.getWordsChallenge('SENTENCE');
  }

  startChallenge() {
    this.challengeState = CHALLENGE_STATE.STARTED;
    this.actualStep = 0;
    this.score = 0;
    this.stepResults = [];
    this.chronometerService.chronometerStart(true);
    this.wordPaletteService.changeWords(true);
  }

  nextChallenge() {
    this.chronometerService.chronometerRestart(true);
    this.wordPaletteService.changeWords(true);
    this.actualStep++;
    if (this.actualStep === this.stepNumber - 1) {
      this.challengeState = CHALLENGE_STATE.TO_FINALIZE;
    }
  }

  endChallenge() {
    this.chronometerService.chronometerStop(true);
    this.challengeState = CHALLENGE_STATE.FINALIZED;
  }

  restartChallenge() {
    this.challengeState = CHALLENGE_STATE.UNSTARTED;
  }

  saveStepResult(stepResult) {
    this.stepResults.push(stepResult);
  }

  openScore() {
    this.scoreDialogRef = this.dialog.open(ScoreDialogComponent, {
      data : {
        optionLevels: this.optionLevels,
        // challengeResults : this.challengeResults
      }
    });

    this.scoreDialogRef.afterClosed().subscribe(result => {
    });
  }

  openSaveScore(): void {
    this.saveScoreDialogRef = this.dialog.open(SaveScoreDialogComponent, {
      width: '250px'
    });

    this.saveScoreDialogRef.afterClosed().subscribe(result => {
      this.user = result.user;
      this.saveScore();
      this.openScore();
    });
  }

  saveScore() {
    this.challengeResult = this.getChallengeResult(this.stepResults);
    this.scoreService.saveScore(this.challengeResult);
    this.challengeState = CHALLENGE_STATE.UNSTARTED;
  }

  getChallengeResult(stepResults): ChallengeResult {
    let totalTime = 0;
    for (let i = 0; i < stepResults.length; i++) {
      if (stepResults[i]) {
        totalTime += stepResults[i].stepTime;
      }
    }
    return new ChallengeResult(this.user, totalTime, this.level);
  }

  getWordsChallenge(challenge): string[] {
    let words;
    this.challengeTypes.forEach(element => {
      if (element.type === challenge) {
        words = element.orderWords;
      }
    });
    return words;
  }

  // pushScoreInChallengeResults(challengeResult) {
  //   this.challengeResults.push(challengeResult);
  //   this.challengeResults.sort((obj1, obj2) => obj1.totalTime - obj2.totalTime);
  // }

}

export enum CHALLENGE_STATE {
  UNSTARTED = 0,
  STARTED = 1,
  TO_FINALIZE = 2,
  FINALIZED = 3
}
