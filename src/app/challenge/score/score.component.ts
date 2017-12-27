import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import {plainToClass} from 'class-transformer';
import { ChallengeResult } from '../challenge-result.model';
import { Location } from '@angular/common';
import { LevelService } from '../../util/level.service';
import { ScoreService } from './score.service';
import { ActivatedRoute } from '@angular/router';
import { ChallengeService } from '../challenge.service';
import { Challenge } from '../challenge.model';

@Component({
    selector: 'app-score',
    templateUrl: 'score.component.html',
  })
  export class ScoreComponent {

    challengeResults: ChallengeResult[];
    optionLevels = [];
    challengeId;
    challenge = new Challenge();
    displayedColumns = ['position', 'user', 'totalTimeFormatted', 'totalCorrectAnswers', 'level'];
    constructor(private scoreService: ScoreService, private location: Location,
        private levelService: LevelService, private route: ActivatedRoute, private challengeService: ChallengeService) {
      this.challengeId = this.route.snapshot.paramMap.get('challengeId');
      scoreService.getAllScoreByChallenge(this.challengeId).subscribe(result => {
          this.challengeResults = plainToClass(ChallengeResult , result);
        });
      this.optionLevels = levelService.getLevels();
      challengeService.getChallengeForId(this.challengeId).subscribe(result => {
        this.challenge = plainToClass(Challenge , result);
      });
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
