import { HttpClient } from '@angular/common/http';
import { BlockUI, BlockUIService, NgBlockUI } from 'ng-block-ui';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ChallengeResult } from '../challenge/challenge-result.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ScoreService {

    @BlockUI() appBlockUI: NgBlockUI;

    urlService = '';

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
        this.urlService = environment.apiUrl;
    }

    public saveScore(score: ChallengeResult): Observable<ChallengeResult> {
        let scoreResult = null;
        this.appBlockUI.start('Cargando..');
        scoreResult = this.http.post<ChallengeResult>(this.urlService + 'score', score);
        this.appBlockUI.stop();
        return scoreResult;
    }

    public getScoreByLevel(level): Array<ChallengeResult>  {
        let score = null;
        this.appBlockUI.start('Cargando..');
        score = this.http.get(this.urlService + 'score/level/' + level);
        this.appBlockUI.stop();
        return score;
    }

    public getAllScoreByChallenge(challenge): Observable<ChallengeResult[]>  {
        let score = null;
        this.appBlockUI.start('Cargando..');
        score = this.http.get(this.urlService + 'score/challenge/' + challenge);
        this.appBlockUI.stop();
        return score;
    }

    public getAllScore(): Observable<ChallengeResult[]> {
        let score;
        this.appBlockUI.start('Cargando..');
        score = this.http.get<ChallengeResult[]>(this.urlService + 'score');
        this.appBlockUI.stop();
        return score;
    }
}
