import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import {plainToClass} from 'class-transformer';
import { ChallengeResult } from '../challenge-result.model';
import { Location } from '@angular/common';
import { LevelService } from '../../util/level.service';
import { ScoreService } from './score.service';

@Component({
    selector: 'app-score',
    templateUrl: 'score.component.html',
  })
  export class ScoreComponent {

    challengeResults: ChallengeResult[];
    optionLevels = [];
    displayedColumns = ['position', 'user', 'totalTimeFormatted', 'totalCorrectAnswers', 'level'];
    constructor(private scoreService: ScoreService, private location: Location, private levelService: LevelService) {
        this.scoreService.getAllScore().subscribe(result => {
          this.challengeResults = plainToClass(ChallengeResult , result);
        });
        this.optionLevels = levelService.getLevels();
      }

    getChallengeResultsDsByLevel(level) {
      if (this.challengeResults) {
        const arrayResult = this.challengeResults.filter(result => result.level === level);
        return new MatTableDataSource<ChallengeResult>(arrayResult);
      }
    }

    goBack(): void {
      this.location.back();
    }
  }
