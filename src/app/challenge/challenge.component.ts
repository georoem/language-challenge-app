import { Subscription } from 'rxjs/Subscription';
import { Challenge, WordTypeChallenge } from './challenge.model';
import { ChallengeService } from './challenge.service';
import { ChallengeResult } from './challenge-result.model';
import { ChronometerService } from './../chronometer/chronometer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordPaletteService } from './../word-palette/word-palette.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import * as moment from 'moment';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SaveScoreDialogComponent } from './save-score.dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LevelService } from '../util/level.service';
import { plainToClass } from 'class-transformer';
import { ScoreService } from './../score/score.service';
import { WordService } from './../word/word.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit, OnDestroy {

  level = 'A1';
  optionLevels;
  selectedOrderWords: WordTypeChallenge[];
  user = '';
  score = 0;
  scoreFormatted = '';
  challengeState = CHALLENGE_STATE.UNSTARTED;
  CHALLENGE_STATE = CHALLENGE_STATE;
  actualStep: number;
  stepResults = [];
  NUMBER_STEPS = 10;
  challengeResult: ChallengeResult;
  challengeResults = [];
  scoreDialogRef = null;
  saveScoreDialogRef = null;
  challengeId;
  challenges: Challenge[];
  challenge = new Challenge();
  isCorrectAnswer = true;
  totalCorrectAnswers = 0;
  values= '';

  private subscription: Subscription = new Subscription();

  constructor(public dialog: MatDialog, private chronometerService: ChronometerService,
    private wordPaletteService: WordPaletteService, private modalService: NgbModal,
    private scoreService: ScoreService, private route: ActivatedRoute, private location: Location,
    private router: Router, private challengeService: ChallengeService, private levelService: LevelService,
    private wordService: WordService) {

    this.subscription.add(chronometerService.chronometerCallback$.subscribe(
      timestamp => {
        this.score += +timestamp;
        this.scoreFormatted = this.score / 1000 + ' Seconds';
        this.saveStepResult({ step: this.actualStep, stepTime: timestamp, isCorrectAnswer: this.isCorrectAnswer });
      }));

    this.subscription.add(wordService.checkWordCallback$.subscribe(
      isValid => {
        this.isCorrectAnswer = isValid;
        this.prepareNextStep();
      }));

    this.subscription.add(challengeService.nextStep$.subscribe(
      next => {
        this.nextStep();
      }));

    this.challengeId = this.route.snapshot.paramMap.get('id');
    challengeService.getChallengeForId(this.challengeId).subscribe(result => {
      this.challenge = plainToClass(Challenge, result);
      if (this.challenge.fixedSteps) {
        this.NUMBER_STEPS = this.challenge.numberSteps;
      } else {
        this.NUMBER_STEPS = this.wordService.getMaxLength();
      }
      this.selectedOrderWords = plainToClass(WordTypeChallenge, this.challenge.wordsTypeChallenge);
    });
    this.optionLevels = levelService.getLevels();
  }

  ngOnInit() {
  }

  onKey(event:any) { // without type info
    this.values += event.code + ' | ';
  }

  startChallenge() {
    if (this.challenge.type === 'TRANSLATE_WORD') {
      this.challengeState = CHALLENGE_STATE.TO_CHECK;
    } else {
      this.challengeState = CHALLENGE_STATE.CHECKED;
    }
    this.wordService.restartWords();
    this.isCorrectAnswer = true;
    this.actualStep = 0;
    this.score = 0;
    this.totalCorrectAnswers = 0,
    this.stepResults = [];
    this.chronometerService.chronometerStart(true);
    this.wordPaletteService.changeWords(true);
  }

  nextStep() {
    this.totalCorrectAnswers = this.isCorrectAnswer ? this.totalCorrectAnswers + 1 : this.totalCorrectAnswers;
    if (this.challengeState === CHALLENGE_STATE.TO_FINALIZE) {
      this.chronometerService.chronometerStop(true);
      this.challengeState = CHALLENGE_STATE.FINALIZED;
    } else {
      this.chronometerService.chronometerRestart(true);
      this.wordPaletteService.changeWords(true);
      this.actualStep++;
      if (this.challenge.type === 'TRANSLATE_WORD') {
        this.challengeState = CHALLENGE_STATE.TO_CHECK;
        this.isCorrectAnswer = false;
      } else {
        if (this.actualStep === this.NUMBER_STEPS - 1) {
          this.challengeState = CHALLENGE_STATE.TO_FINALIZE;
        } else {
          this.challengeState = CHALLENGE_STATE.CHECKED;
        }
      }
    }
  }

  checkStep() {
    this.wordPaletteService.checkWords(true);
  }

  prepareNextStep() {
    if (this.actualStep === this.NUMBER_STEPS - 1) {
      this.challengeState = CHALLENGE_STATE.TO_FINALIZE;
    } else {
      this.challengeState = CHALLENGE_STATE.CHECKED;
    }
  }

  restartChallenge() {
    this.challengeState = CHALLENGE_STATE.UNSTARTED;
  }

  saveStepResult(stepResult) {
    this.stepResults.push(stepResult);
  }

  openSaveScore(): void {
    this.saveScoreDialogRef = this.dialog.open(SaveScoreDialogComponent, {
      width: '250px'
    });

    this.saveScoreDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result.user;
        this.saveScore();
      }
    });
  }

  saveScore() {
    this.challengeResult = this.getChallengeResult(this.stepResults);
    this.scoreService.saveScore(this.challengeResult).subscribe(data => {
      this.challengeState = CHALLENGE_STATE.UNSTARTED;
      this.router.navigateByUrl('/score/' + this.challengeId);
    });
  }

  getChallengeResult(stepResults): ChallengeResult {
    let totalTime = 0;
    for (let i = 0; i < stepResults.length; i++) {
      if (stepResults[i]) {
        totalTime += stepResults[i].stepTime;
      }
    }
    return new ChallengeResult(this.user, totalTime, this.level, this.totalCorrectAnswers, this.NUMBER_STEPS, this.challengeId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export enum CHALLENGE_STATE {
  UNSTARTED = 0,
  CHECKED = 1,
  TO_FINALIZE = 2,
  FINALIZED = 3,
  TO_CHECK = 4,
}
