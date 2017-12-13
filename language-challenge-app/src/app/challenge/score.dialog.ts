import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ChallengeResult } from './challenge-result.model';
import { ScoreService } from '../util/score.service';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-list-score-dialog',
    templateUrl: 'score.dialog.html',
  })
  export class ScoreDialogComponent {

    challengeResults: ChallengeResult[];
    optionLevels = [];
    displayedColumns = ['position', 'user', 'totalTimeFormatted', 'level'];
    constructor(public dialogRef: MatDialogRef<ScoreDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private scoreService: ScoreService) {
        this.scoreService.getAllScore().subscribe(result => {
          this.challengeResults = plainToClass(ChallengeResult , result);
        });
        this.optionLevels = data.optionLevels;
      }

    close() {
      this.dialogRef.close();
    }

    getChallengeResultsDsByLevel(level) {
      if (this.challengeResults) {
        const arrayResult = this.challengeResults.filter(result => result.level === level);
        return new MatTableDataSource<ChallengeResult>(arrayResult);
      }
    }
  }
